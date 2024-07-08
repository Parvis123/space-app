"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0d0d0d",
      paper: "#1c1c1c",
    },
    primary: {
      main: "#FFD700",
    },
    secondary: {
      main: "#03dac6",
    },
    text: {
      primary: "#ffffff",
      secondary: "#d0d0d0",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      color: "#ffffff",
      fontWeight: 700,
    },
    h2: {
      color: "#ffffff",
      fontWeight: 600,
    },
    h3: {
      color: "#ffffff",
      fontWeight: 500,
    },
    body1: {
      color: "#d0d0d0",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1c1c1c",
          color: "#ffffff",
        },
      },
    },
  },
});

export default theme;
