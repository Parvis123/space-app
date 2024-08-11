import React from "react";

import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Image from "next/image";

interface MarsPhotoItemProps {
  photo: {
    id: number;
    img_src: string;
    earth_date: string;
    camera: {
      full_name: string;
    };
  };
}

const MarsPhotoItem: React.FC<MarsPhotoItemProps> = ({ photo }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card>
      <CardMedia
        component="div"
        sx={{
          position: "relative",
          height: 0,
          paddingTop: "56.25%",
        }}
      >
        <Image
          src={photo.img_src}
          alt={`Mars photo taken by ${photo.camera.full_name}`}
          layout="fill"
          objectFit="cover"
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Date: {photo.earth_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Camera: {photo.camera.full_name}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default MarsPhotoItem;
