import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const fetchViewCategory = createAsyncThunk(
  "ViewCategory/fetchViewCategory",
  async () => {
    const token = getTokenFromLocalStorage();

    const res = await fetch(
      `${apiUrl}/sales/dealer/dealers/${selectedCategory}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const final = await res.json();
    return final;
  }
);

const ViewCategorySlice = createSlice({
  name: "ViewCategory",
  initialState: {
    ViewCategoryData: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchViewCategory.pending, (state) => {
      state.isLoader = true;
    });
    builder.addCase(fetchViewCategory.fulfilled, (state, action) => {
      state.isLoader = false;
      state.ViewCategoryData = action.payload;
      //   console.log("Viewcattt data:", action.payload);
    });
    builder.addCase(fetchViewCategory.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

export default ViewCategorySlice.reducer;
