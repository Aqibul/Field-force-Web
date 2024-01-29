import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchViewDashboard = createAsyncThunk(
  "ViewDashboard/fetchViewDashboard",
  async () => {
    const token = getTokenFromLocalStorage();

    const res = await fetch(`${apiUrl}/sales/pjb-report/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const final = await res.json();
    return final;
  }
);

const ViewDashboardSlice = createSlice({
  name: "ViewDashboard",
  initialState: {
    ViewDashboardData: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchViewDashboard.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchViewDashboard.fulfilled, (state, action) => {
      state.isLoader = false;
      state.ViewDashboardData = action.payload;
      //   console.log("Viewcattt data:", action.payload);
    });
    builder.addCase(fetchViewDashboard.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ViewDashboardSlice.reducer;
