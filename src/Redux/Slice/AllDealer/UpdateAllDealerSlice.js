import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const updateAllDealer = createAsyncThunk(
  "auth/updateAllDealer",
  async (credentials) => {
    console.log("Form Data Received:", credentials);
    // const token = getTokenFromLocalStorage();

    const res = await fetch(`${apiUrl}/sales/dealer/customers/update`, {
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

const allDealerupdateSlice = createSlice({
  name: "updateAllDealer",
  initialState: {
    updateAllDealer: null,
    isAuthenticated: false,
    isLoader: false,
    isError: false,
    token: null,
  },
  extraReducers: (builder) => {
    builder.updateCase(updateAllDealer.pending, (state) => {
      state.isLoader = true;
      state.isError = false;
    });
    builder.updateCase(updateAllDealer.fulfilled, (state, action) => {
      state.isLoader = false;
      state.isAuthenticated = true;
      state.updateAllDealer = action.payload.data;
      state.token = action.payload.token;
    });
    builder.updateCase(updateAllDealer.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default allDealerupdateSlice.reducer;
