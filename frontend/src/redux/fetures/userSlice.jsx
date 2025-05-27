import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../server/server";

// Fetch all users
export const getUsers = createAsyncThunk(
  "fetch/users",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Fetch selected user by ID
export const getSelectedUser = createAsyncThunk(
  "fetch/selectedUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Create a new user
export const postUser = createAsyncThunk(
  "post/user",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`/users`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// Delete a user
export const deleteUser = createAsyncThunk(
  "delete/user",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

export const deleteSelectedUsers = createAsyncThunk(
  "deleteSelectedOnes/user",
  async (ids, { rejectWithValue }) => {
    try {
      await api.delete("/users/delete_multiple", {
        data: { ids },
      });
      return ids;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// Update a user
export const updateUser = createAsyncThunk(
  "update/user",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(`/users`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = {};
    },
    clearUsersList: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(postUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSelectedUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getSelectedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSelectedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (u) => !action.payload.includes(u._id)
        );
      })
      .addCase(deleteSelectedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUsersList, clearSelectedUser } = userSlice.actions;

export default userSlice.reducer;
