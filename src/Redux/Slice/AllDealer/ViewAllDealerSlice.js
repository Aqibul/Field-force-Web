import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchViewAllDealer = createAsyncThunk(
  "ViewAllDealer/fetchViewAllDealer",
  async () => {
    const token = getTokenFromLocalStorage();

    const res = await fetch(`${apiUrl}/sales/dealer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const final = await res.json();
    return final;
  }
);

const ViewAllDealerSlice = createSlice({
  name: "ViewAllDealer",
  initialState: {
    ViewAllDealerData: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchViewAllDealer.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchViewAllDealer.fulfilled, (state, action) => {
      state.isLoader = false;
      state.ViewAllDealerData = action.payload;
      //   console.log("View dealer data:", action.payload);
    });
    builder.addCase(fetchViewAllDealer.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ViewAllDealerSlice.reducer;
