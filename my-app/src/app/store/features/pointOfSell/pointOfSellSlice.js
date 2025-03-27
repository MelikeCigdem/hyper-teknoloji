import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localBasket:
    typeof window !== "undefined" && localStorage.getItem("localBasket")
      ? JSON.parse(localStorage.getItem("localBasket")) || []
      : [],
  localTotalBasePrice:
    typeof window !== "undefined" && localStorage.getItem("localTotalBasePrice")
      ? JSON.parse(localStorage.getItem("localTotalBasePrice"))
      : 0,
};

export const pointOfSellSlice = createSlice({
  name: "pointOfSell",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.localBasket.findIndex(
        (i) => i.productID === item.productID
      );

      if (existingItemIndex >= 0) {
        state.localBasket[existingItemIndex] = {
          ...state.localBasket[existingItemIndex],
          quantity: state.localBasket[existingItemIndex].quantity + 1,
        };
      } else {
        state.localBasket.push({
          ...item,
          quantity: 1,
        });
      }

      let newTotalPrice = 0;
      state.localBasket.forEach((product) => {
        newTotalPrice += product.salePrice * product.quantity;
      });

      localStorage.setItem("localBasket", JSON.stringify(state.localBasket));
      localStorage.setItem(
        "localTotalBasePrice",
        JSON.stringify(newTotalPrice)
      );

      state.localTotalBasePrice = newTotalPrice;
    },
    // Bu fonksiyonlar sipariş detay sayfasında kullanılacak
    removeFromBasket: (state, action) => {
      const item = action.payload;
      state.localBasket = state.localBasket.filter(
        (a) => a.rd_id !== item.rd_id
      );

      let newTotalPrice = 0;
      state.localBasket.forEach((product) => {
        newTotalPrice += product.salePrice * product.quantity;
      });

      localStorage.setItem("localBasket", JSON.stringify(state.localBasket));
      localStorage.setItem(
        "localTotalBasePrice",
        JSON.stringify(newTotalPrice)
      );

      state.localTotalBasePrice = newTotalPrice;
    },
    clearBasket: (state) => {
      state.localBasket = [];
      state.localTotalBasePrice = 0;

      localStorage.removeItem("localBasket");
      localStorage.removeItem("localTotalBasePrice");
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  pointOfSellSlice.actions;

export default pointOfSellSlice.reducer;
