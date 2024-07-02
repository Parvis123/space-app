import * as React from "react";

import { Box, Typography } from "@mui/material";

interface IHeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<IHeroProps> = ({ title, subtitle }) => (
  <Box
    sx={{
      width: "100%",
      height: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 2,
      py: 5,
      textAlign: "center",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "white",
      background: "linear-gradient(135deg, #000000, #1a1a1a, #2c003e, #0a0a23)",
    }}
  >
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
        fontWeight: 800,
        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
        color: "inherit",
        maxWidth: "54ch",
        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

export default Hero;
