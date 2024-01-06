import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const addAllDealer = createAsyncThunk(
  "auth/addAllDealer",
  async (credentials) => {
    console.log("Form Data Received:", credentials);
    // const token = getTokenFromLocalStorage();

    const res = await fetch(`${apiUrl}/sales/dealer/customers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 32|LKWlxpo961loITF1XPqH6wqpBGEiBOz2xMDl0SrEdede90e9",
        Accept: "*/*",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.status) {
      alert(data.message);
    }
    return data;
  }
);

const allDealerAddSlice = createSlice({
  name: "AddAllDealer",
  initialState: {
    AddAllDealer: null,
    isAuthenticated: false,
    isLoader: false,
    isError: false,
    token: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addAllDealer.pending, (state) => {
      state.isLoader = true;
      state.isError = false;
    });
    builder.addCase(addAllDealer.fulfilled, (state, action) => {
      state.isLoader = false;
      state.isAuthenticated = true;
      state.AddAllDealer = action.payload.data;
      state.token = action.payload.token;
    });
    builder.addCase(addAllDealer.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default allDealerAddSlice.reducer;
