"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
      paper: "#1A1A1A",
    },
    primary: {
      main: "#90CAF9",
    },
    secondary: {
      main: "#F48FB1",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: "#FFFFFF",
    },
    body1: {
      color: "#B3B3B3",
    },
  },
});

export default theme;
