"use client";

import { useState } from "react";

import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Tooltip,
  IconButton,
  Alert,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import Navbar from "../components/Navbar";
import DateController from "../components/DateController";
import MarsPhotoItem from "../components/MarsPhotoItem";
import { NASA_API_KEY } from "../constants";

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
}

const MarsPhotosPage = () => {
  const maxDate = dayjs("2015-06-03");
  const minDate = dayjs("2012-08-06");
  const [selectedDate, setSelectedDate] = useState(maxDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchMarsPhotos = async (date: dayjs.Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=${NASA_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Mars photos");
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["marsPhotos", selectedDate.format("YYYY-MM-DD")],
    queryFn: () => fetchMarsPhotos(selectedDate),
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/mars.bmp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 8, mb: 5, pb: 5 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ color: "white", mr: 1 }}
          >
            Mars Rover Photos
          </Typography>
          <Tooltip
            title={`Photos captured by NASA's Curiosity Rover, available from ${minDate.format(
              "MMMM D, YYYY"
            )} to  to ${maxDate.format("MMMM D, YYYY")}.`}
          >
            <IconButton size="small">
              <InfoIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <DateController
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
          showDatePicker={showDatePicker}
          onToggleDatePicker={() => setShowDatePicker(!showDatePicker)}
        />
        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            An error occurred while fetching photos:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </Alert>
        ) : data?.photos && data.photos.length > 0 ? (
          <Grid container spacing={3}>
            {data.photos.slice(0, 9).map((photo: MarsPhoto) => (
              <MarsPhotoItem key={photo.id} photo={photo} />
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ mt: 2 }}>
            No photos available for {selectedDate.format("MMMM D, YYYY")}.
            Please try another date.
          </Alert>
        )}
      </Container>
    </>
  );
};

export default MarsPhotosPage;
