import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../../apiConfig";

// const getTokenFromLocalStorage = () => {
//   return localStorage.getItem("token");
// };

export const fetchViewCategory = createAsyncThunk(
  "ViewCategory/fetchViewCategory",
  async () => {
    // const token = getTokenFromLocalStorage();s

    const res = await fetch(`${apiUrl}/sales/category`, {
      headers: {
        // Authorization: `Bearer ${token}`,
        Authorization:
          "Bearer 32|LKWlxpo961loITF1XPqH6wqpBGEiBOz2xMDl0SrEdede90e9",
      },
    });

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
