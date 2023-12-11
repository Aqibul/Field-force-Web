import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./Slice/ProductsSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
});
