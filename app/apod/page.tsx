"use client";

import { useState } from "react";

import InfoIcon from "@mui/icons-material/Info";
import {
  Grid,
  Typography,
  Box,
  Button,
  Container,
  CircularProgress,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";

import DateController from "../components/DateController";
import Navbar from "../components/Navbar";
import fetchData from "../utils/api";

const APODPage = () => {
  const theme = useTheme();

  const yesterday = dayjs().subtract(1, "day");
  const minDate = dayjs().subtract(3, "month");

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(yesterday);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  const { data, error, isLoading } = useQuery({
    queryKey: ["apod", selectedDate.format("YYYY-MM-DD")],
    queryFn: () => fetchData(selectedDate.format("YYYY-MM-DD")),
    refetchOnWindowFocus: true,
  });

  const nasaLink = `https://apod.nasa.gov/apod/ap${dayjs(selectedDate).format(
    "YYMMDD"
  )}.html`;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (isLoading)
    return (
      <div className="starfield">
        <Container
          maxWidth="xl"
          sx={{
            mt: 8,
            pt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 64px)",
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
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 8, pt: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ color: "white", mr: 1 }}
          >
            Astronomy Picture of the Day
          </Typography>
          <Tooltip title="Daily astronomy pictures and descriptions provided by NASA.">
            <IconButton size="small">
              <InfoIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <DateController
          selectedDate={selectedDate}
          onDateChange={(newDate) => {
            setSelectedDate(newDate);
            setImageLoading(true);
          }}
          minDate={minDate}
          maxDate={yesterday}
          showDatePicker={showDatePicker}
          onToggleDatePicker={() => setShowDatePicker(!showDatePicker)}
        />
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
                    backgroundColor: "black",
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
