import { configureStore } from "@reduxjs/toolkit";
import pageBuilderReducer from "../../features/pageBuilderSlice";

export const store = configureStore({
  reducer: {
    pageBuilder: pageBuilderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
