"use client";

import { useState } from "react";

import { Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";

import fetchData from "../utils/api";

const APODPage = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().subtract(1, "day").format("YYYY-MM-DD") // Set initial date to yesterday
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["apod", selectedDate],
    queryFn: () => fetchData(selectedDate),
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error instanceof Error)
    return <Typography>An error occurred: {error.message}</Typography>;

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      <Grid
        item
        xs={12}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={dayjs(selectedDate)}
              onChange={(newValue) => {
                const newDate = dayjs(newValue);
                const minDate = dayjs().subtract(3, "month");
                const maxDate = dayjs().subtract(1, "day");
                if (newDate.isAfter(minDate) && newDate.isBefore(maxDate)) {
                  setSelectedDate(newDate.format("YYYY-MM-DD"));
                }
              }}
              minDate={dayjs().subtract(3, "month")}
              maxDate={dayjs().subtract(1, "day")}
              disableFuture
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs>
          <Typography variant="h4" gutterBottom textAlign="center">
            {data?.title}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {data.media_type === "video" ? (
          <iframe
            width="600"
            height="400"
            src={data?.url}
            title={data?.title}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <Image src={data?.url} alt={data?.title} width={600} height={600} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <strong>Explanation:</strong> {data?.explanation}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default APODPage;
