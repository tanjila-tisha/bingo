import { configureStore } from "@reduxjs/toolkit";
import bingoSlice from "./features/bingo/bingoSlice";

export const store = configureStore({
  reducer: {
    bingo: bingoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
