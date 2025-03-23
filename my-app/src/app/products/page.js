"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";
export default function MediaCard() {
  const addItemToBasket = async (product) => {
    dispatch(addToBasket(product));
  };

  const dispatch = useDispatch();
  return (
    <Grid2
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      className="m-6"
    >
      {Array.from(Array(10)).map((_, index) => (
        <Grid2 item xs={2} sm={4} md={4} key={index}>
          <Card sx={{ maxWidth: 545 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://www.colchesterzoologicalsociety.com/wp-content/uploads/2024/09/Green-Iguana-600x380.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
            <CardActions>
              <Typography variant="body2" fontSize={16}>
                12.456 TL
              </Typography>
              <Button
                variant="contained"
                color="warning"
                endIcon={<ShoppingCartIcon />}
                onClick={() => {
                  addItemToBasket(product);
                }}
              >
                Sepete Ekle
              </Button>
            </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}
