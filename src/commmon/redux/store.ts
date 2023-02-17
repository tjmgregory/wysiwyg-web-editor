import { configureStore } from "@reduxjs/toolkit";
import blockEditorReducer from "../../features/blockEditorSlice";

export const store = configureStore({
  reducer: {
    blockEditor: blockEditorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
