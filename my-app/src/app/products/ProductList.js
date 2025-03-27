"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  addToFavorites,
  removeFromFavorites
} from "@/app/store/features/pointOfSell/pointOfSellSlice";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
export default function ProductList({ products }) {
  const dispatch = useDispatch();

  const addItemToBasket = (product) => {
    dispatch(addToBasket(product));
  };

  const favorites = useSelector((state) => state.pointOfSell.localFavorites);

  const isFavorite = (productID) => {
    return favorites.some((item) => item.productID === productID);
  };

  const handleFavorite = (product) => {
    if (isFavorite(product.productID)) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.data.map((product, index) => (
        <Card key={product.productID || index} className="relative w-full">
          <button
            className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={() => handleFavorite(product)}
          >
            {isFavorite(product.productID) ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-gray-500" />
            )}
          </button>

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

          <CardActions className="flex justify-between w-full px-4 py-2">
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
