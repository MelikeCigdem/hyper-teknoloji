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
  localFavorites:
    typeof window !== "undefined" && localStorage.getItem("localFavorites")
      ? JSON.parse(localStorage.getItem("localFavorites")) || []
      : [],
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
    addToFavorites: (state, action) => {
      const item = action.payload;
      const existingIndex = state.localFavorites.findIndex(
        (i) => i.productID === item.productID
      );

      if (existingIndex === -1) {
        state.localFavorites.push(item);
        localStorage.setItem(
          "localFavorites",
          JSON.stringify(state.localFavorites)
        );
      }
    },

    removeFromFavorites: (state, action) => {
      const item = action.payload;
      state.localFavorites = state.localFavorites.filter(
        (i) => i.productID !== item.productID
      );

      localStorage.setItem(
        "localFavorites",
        JSON.stringify(state.localFavorites)
      );
    },

    clearFavorites: (state) => {
      state.localFavorites = [];
      localStorage.removeItem("localFavorites");
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket,addToFavorites,removeFromFavorites,clearFavorites } =
  pointOfSellSlice.actions;

export default pointOfSellSlice.reducer;
