import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../apiConfig";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const res = await fetch(`${apiUrl}/web-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoader: false,
    isError: false,
    token: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoader = true;
      state.isError = false;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoader = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;

      const token = action.payload.token || action.payload.data.token || null;

      state.token = token;

      // Save the token to local storage
      localStorage.setItem("token", token);
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoader = false;
      state.isError = true;
      state.isAuthenticated = false;
      state.errorMessage = action.error.message || "Login failed";
    });
  },
});

export const { logoutUser, setAuthToken } = authSlice.actions;

export default authSlice.reducer;
