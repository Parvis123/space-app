import React from "react";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

interface InfoCardProps {
  items: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

const InfoCard: React.FC<InfoCardProps> = ({ items }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    }}
  >
    {items.map((item, index) => (
      <Card key={index} sx={{ maxWidth: 345, margin: "20px" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} href={item.link}>
            View More
          </Button>
        </CardActions>
      </Card>
    ))}
  </Box>
);

export default InfoCard;
