// Import necessary dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../apiConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const getTokenFromLocalStorage = () => {
//   return localStorage.getItem("token");
// };

// Async thunk for adding a company
export const addPjp = createAsyncThunk("pjp/addPjp", async (formData) => {
  try {
    // const token = getTokenFromLocalStorage();

    const response = await axios.post(
      `${apiUrl}/sales/pjb-report/add`,

      formData,
      {
        headers: {
          Authorization:
            "Bearer 32|LKWlxpo961loITF1XPqH6wqpBGEiBOz2xMDl0SrEdede90e9",
        },
      }
    );

    const data = response.data;
    console.log(data);
    if (data.status) {
      // alert(data.message);
      toast.success(data.message);
      return data;
    }
  } catch (error) {
    alert();
    console.error("Error adding pjp:", error);
    // return data;
    throw error; // Re-throw the error to be caught in the .catch() block
  }
});

// Create a slice for the company state
const pjpAddSlice = createSlice({
  name: "pjp",
  initialState: {
    pjp: null,
    isAuthenticated: false,
    isLoader: false,
    isError: false,
    token: null,
  },
  extraReducers: (builder) => {
    builder.addCase(addPjp.pending, (state) => {
      state.isLoader = true;
      state.isError = false;
    });
    builder.addCase(addPjp.fulfilled, (state, action) => {
      state.isLoader = false;
      state.isAuthenticated = true;
      state.pjp = action.payload.data;
      state.token = action.payload.token;
    });
    builder.addCase(addPjp.rejected, (state) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});

// Export the reducer
export default pjpAddSlice.reducer;
