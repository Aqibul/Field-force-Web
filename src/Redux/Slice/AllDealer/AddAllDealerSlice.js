import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const addAllDealer = createAsyncThunk(
  "auth/addAllDealer",
  async (credentials) => {
    const token = getTokenFromLocalStorage();
    try {
      const res = await fetch(`${apiUrl}/sales/dealer/customers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        // Check if there are errors in the response
        if (data && data.errors) {
          console.error("API Error:", data.errors);
          throw new Error(data.errors); // Throw the error to be caught in the catch block
        } else {
          console.error("Unknown API Error");
          throw new Error("Unknown API Error");
        }
      }

      if (data.status) {
        alert(data.message);
      }

      return data;
    } catch (error) {
      // Log the error here
      console.error("Error from API:", error);
      throw error; // Re-throw the error so that it can be handled by the calling code
    }
  }
);

const allDealerAddSlice = createSlice({
  name: "AddAllDealer",
  initialState: {
    AddAllDealer: null,
    isAuthenticated: false,
    isLoader: false,
    isError: false,
    error: null, // New property to store the error
    token: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addAllDealer.pending, (state) => {
      state.isLoader = true;
      state.isError = false;
      state.error = null; // Reset error on pending
    });
    builder.addCase(addAllDealer.fulfilled, (state, action) => {
      state.isLoader = false;
      state.isAuthenticated = true;
      state.AddAllDealer = action.payload.data;
      state.token = action.payload.token;
    });
    builder.addCase(addAllDealer.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
      state.error = action.error.message; // Store the error in the state
      console.error("Redux Rejected Action:", action);
      console.log("State after rejection:", state);
    });
  },
});

export default allDealerAddSlice.reducer;
