import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchViewProfile = createAsyncThunk(
  "ViewProfile/fetchViewProfile",
  async () => {
    const token = getTokenFromLocalStorage();

    const res = await fetch(`${apiUrl}/sales/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const final = await res.json();
    return final;
  }
);

const ViewProfileSlice = createSlice({
  name: "ViewProfile",
  initialState: {
    ViewProfileData: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchViewProfile.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchViewProfile.fulfilled, (state, action) => {
      state.isLoader = false;
      state.ViewProfileData = action.payload;
      //   console.log("Viewcattt data:", action.payload);
    });
    builder.addCase(fetchViewProfile.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ViewProfileSlice.reducer;
