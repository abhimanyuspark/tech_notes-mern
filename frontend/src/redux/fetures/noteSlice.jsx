import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../server/server";

// Fetch all notes
export const getNotes = createAsyncThunk(
  "fetch/notes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/notes`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notes"
      );
    }
  }
);

// Fetch selected note by ID
export const getSelectedNote = createAsyncThunk(
  "fetch/selectedNote",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/notes/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch note"
      );
    }
  }
);

// Create a new note
export const postNote = createAsyncThunk(
  "post/note",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post(`/notes`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create note"
      );
    }
  }
);

// Delete a note
export const deleteNote = createAsyncThunk(
  "delete/note",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/notes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete note"
      );
    }
  }
);

// Update a note
export const updateNote = createAsyncThunk(
  "update/note",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put(`/notes`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update note"
      );
    }
  }
);

export const deleteSelectedNotes = createAsyncThunk(
  "deleteSelectedOnes/note",
  async (ids, { rejectWithValue }) => {
    try {
      await api.delete("/notes/delete_multiple", {
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

const initialState = {
  notes: [],
  loading: false,
  error: null,
  selectedNote: {},
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearSelectedNote: (state) => {
      state.selectedNote = {};
    },
    clearNotesList: (state) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSelectedNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSelectedNote.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNote = action.payload;
      })
      .addCase(getSelectedNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter((n) => n._id !== action.payload);
      })

      .addCase(deleteSelectedNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(
          (n) => !action.payload.includes(n._id)
        );
      })

      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedNote, clearNotesList } = noteSlice.actions;

export default noteSlice.reducer;
