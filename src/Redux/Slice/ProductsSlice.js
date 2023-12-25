import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../apiConfig";

export const fetchProducts = createAsyncThunk(
  "Products/fetchProducts",
  async () => {
    const res = await fetch(`${apiUrl}/products`);
    const final = await res.json();
    return final;
  }
);

const ProductsSlice = createSlice({
  name: "Products",
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ProductsSlice.reducer;
