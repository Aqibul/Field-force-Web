import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchViewPjp = createAsyncThunk(
  "ViewPjp/fetchViewPjp",
  async () => {
    const token = getTokenFromLocalStorage();

    const res = await fetch(`${apiUrl}/sales/pjb-report`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const final = await res.json();
    return final;
  }
);

const ViewPjpSlice = createSlice({
  name: "ViewPjp",
  initialState: {
    ViewPjpData: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchViewPjp.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchViewPjp.fulfilled, (state, action) => {
      state.isLoader = false;
      state.ViewPjpData = action.payload;
      // console.log("ViewPjp data:", action.payload);
    });
    builder.addCase(fetchViewPjp.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ViewPjpSlice.reducer;
