"use client";

import { useState } from "react";

import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import {
  Grid,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";

import fetchData from "../utils/api";

const APODPage = () => {
  const theme = useTheme();

  const yesterday = dayjs().subtract(1, "day");
  const minDate = dayjs().subtract(3, "month");

  const [selectedDate, setSelectedDate] = useState<string>(
    yesterday.format("YYYY-MM-DD")
  );
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const { data, error, isLoading } = useQuery({
    queryKey: ["apod", selectedDate],
    queryFn: () => fetchData(selectedDate),
    refetchOnWindowFocus: true,
  });

  const nasaLink = `https://apod.nasa.gov/apod/ap${dayjs(selectedDate).format(
    "YYMMDD"
  )}.html`;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handlePreviousDay = () => {
    setSelectedDate(
      dayjs(selectedDate).subtract(1, "day").format("YYYY-MM-DD")
    );
    setImageLoading(true);
  };

  const handleNextDay = () => {
    setSelectedDate(dayjs(selectedDate).add(1, "day").format("YYYY-MM-DD"));
    setImageLoading(true);
  };

  if (isLoading)
    return (
      <div className="starfield">
        <Container
          maxWidth="xl"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Container>
      </div>
    );
  if (error instanceof Error)
    return <Typography>An error occurred: {error.message}</Typography>;

  return (
    <div className="starfield">
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          {dayjs(selectedDate).isSame(minDate, "day") ? (
            <Tooltip title="No more images hosted beyond this date">
              <span>
                <IconButton
                  aria-label="previous day"
                  onClick={handlePreviousDay}
                  disabled
                >
                  <ArrowBackIosSharpIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <IconButton aria-label="previous day" onClick={handlePreviousDay}>
              <ArrowBackIosSharpIcon />
            </IconButton>
          )}
          <Typography variant="h3">
            {dayjs(selectedDate).format("MMMM D, YYYY")}
          </Typography>
          {dayjs(selectedDate).isSame(yesterday, "day") ? (
            <Tooltip title="This image is not yet published by NASA">
              <span>
                <IconButton
                  aria-label="next day"
                  onClick={handleNextDay}
                  disabled
                >
                  <ArrowForwardIosSharpIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <IconButton aria-label="next day" onClick={handleNextDay}>
              <ArrowForwardIosSharpIcon />
            </IconButton>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            height: 56,
            width: "100%",
          }}
        >
          {showDatePicker ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={dayjs(selectedDate)}
                  onChange={(newValue) => {
                    const newDate = dayjs(newValue);
                    if (
                      newDate.isAfter(minDate) &&
                      newDate.isBefore(yesterday)
                    ) {
                      setSelectedDate(newDate.format("YYYY-MM-DD"));
                      setImageLoading(true);
                    }
                  }}
                  minDate={minDate}
                  maxDate={yesterday}
                  disableFuture
                />
              </LocalizationProvider>
              <Button
                onClick={() => setShowDatePicker(false)}
                sx={{ minWidth: "auto" }}
              >
                Hide
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={() => setShowDatePicker(true)}
              sx={{ height: 45, width: "auto", minWidth: "auto" }}
            >
              Show Date Picker
            </Button>
          )}
        </Box>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%", // 16:9 aspect ratio
                backgroundColor: "#000",
              }}
            >
              {imageLoading && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {data.media_type === "video" ? (
                <iframe
                  src={data?.url}
                  title={data?.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              ) : (
                <Image
                  src={data?.url}
                  alt={data?.title}
                  layout="fill"
                  objectFit="contain"
                  onLoad={handleImageLoad}
                  style={{
                    backgroundColor: "black", // Match this to the predominant background color of the image
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                href={data?.hdurl || data?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View RAW {data?.media_type === "video" ? "Video" : "Image"}
              </Button>
              <Button
                variant="outlined"
                href={nasaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                NASA Archive
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ height: "100%" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", mb: 2 }}
                color={theme.palette.primary.main}
              >
                {data?.title}
              </Typography>
              <Typography
                variant="body1"
                textAlign="justify"
                sx={{
                  mb: 2,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.explanation}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default APODPage;
