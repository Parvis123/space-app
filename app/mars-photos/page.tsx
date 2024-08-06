"use client";

import { useState } from "react";

import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import Navbar from "../components/Navbar";
import { NASA_API_KEY } from "../constants";

interface MarsPhoto {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
}

const fetchMarsPhotos = async (rover: string, sol: number) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Mars photos");
  }
  return response.json();
};

const MarsPhotosPage = () => {
  const [rover, setRover] = useState("curiosity");
  const [sol, setSol] = useState(1000);

  const { data, error, isLoading } = useQuery({
    queryKey: ["marsPhotos", rover, sol],
    queryFn: () => fetchMarsPhotos(rover, sol),
  });

  if (isLoading) {
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
  }

  if (error instanceof Error) {
    return <Typography>An error occurred: {error.message}</Typography>;
  }

  return (
    <>
      <Navbar />
      <div
        className="starfield"
        style={{ position: "fixed", inset: 0, zIndex: -1 }}
      />
      <Container maxWidth="xl" sx={{ mt: 8, mb: 5, pb: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Mars Rover Photos
        </Typography>
        <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="rover-select-label">Rover</InputLabel>
            <Select
              labelId="rover-select-label"
              value={rover}
              label="Rover"
              onChange={(e) => setRover(e.target.value)}
            >
              {["curiosity", "opportunity", "spirit"].map((value) => (
                <MenuItem key={value} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="sol-select-label">Sol</InputLabel>
            <Select
              labelId="sol-select-label"
              value={sol}
              label="Sol"
              onChange={(e) => setSol(Number(e.target.value))}
            >
              {[1, 10, 100, 1000, 2000].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={3}>
          {data?.photos?.slice(0, 9).map((photo: MarsPhoto) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <Box sx={{ position: "relative", paddingTop: "75%", mb: 2 }}>
                <Image
                  src={photo.img_src.replace("http:", "https:")}
                  alt={`Mars photo taken by ${photo.camera.full_name}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Typography variant="body2">
                Date: {photo.earth_date}
                <br />
                Camera: {photo.camera.full_name}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MarsPhotosPage;
