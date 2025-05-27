import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

// * LOGIN
export const loginAuth = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}/auth`, data, {
        withCredentials: true, // Ensures cookies are sent/received
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// * REFRESH TOKEN
export const refreshAuth = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/auth/refresh`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to refresh token"
      );
    }
  }
);

// * LOGOUT
export const logOutAuth = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });

      return null; // Clear token from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// * Initial State
const initialState = {
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload?.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      // * LOGIN
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.accessToken;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // * REFRESH TOKEN
      .addCase(refreshAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload?.accessToken;
      })
      .addCase(refreshAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // * LOGOUT
      .addCase(logOutAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutAuth.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logOutAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
