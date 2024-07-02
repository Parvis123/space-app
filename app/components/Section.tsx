import React from "react";

import { Box, Typography, Button } from "@mui/material";

interface SectionProps {
  title: string;
  description: string;
  link: string;
  backgroundImage: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  link,
  backgroundImage,
}) => (
  <Box
    sx={{
      mb: 5,
      p: 3,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
    <Typography variant="h4" component="h2" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      {description}
    </Typography>
    <Button variant="contained" href={link}>
      Learn More
    </Button>
  </Box>
);

export default Section;
