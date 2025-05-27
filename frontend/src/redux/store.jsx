import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./fetures/userSlice";
import noteSlice from "./fetures/noteSlice";
import authSlice from "./fetures/authSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    users: userSlice,
    notes: noteSlice,
    auth: authSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),

  devTools: true,
});
