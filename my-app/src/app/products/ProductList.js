"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "@/app/store/features/pointOfSell/pointOfSellSlice";
import Image from "next/image";
export default function ProductList({ products }) {
  const dispatch = useDispatch();

  const addItemToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.data.map((product, index) => (
        <Card key={product.productID || index} className="w-full">
          <Image
            src={product.productData.productMainImage}
            width={200}
            height={200}
            alt={product.productName}
            className="w-full h-auto"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {product.productName}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: { xs: "8px", sm: "12px", md: "16px", lg: "20px" }, 
            }}
          >
            <Typography variant="h6">{product.salePrice} TL</Typography>
            <Button
              variant="contained"
              color="warning"
              endIcon={<ShoppingCartIcon />}
              onClick={() => addItemToBasket(product)}
            >
              Sepete Ekle
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
