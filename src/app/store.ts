import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import connectedNodeReducer from "../ConnectedNode/connectedNodeSlice";

export const store = configureStore({
  reducer: {
    connectedNode: connectedNodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
