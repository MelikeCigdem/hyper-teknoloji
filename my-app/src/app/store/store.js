import { configureStore } from "@reduxjs/toolkit";
import pointOfSellReducer from "./features/pointOfSell/pointOfSellSlice";

export const store = configureStore({
  reducer: { pointOfSell: pointOfSellReducer },
});