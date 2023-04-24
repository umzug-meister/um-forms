import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appReducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
