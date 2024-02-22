import { configureStore } from "@reduxjs/toolkit";
import visibilitySlice from "./visibilitySlice";
import userSlice from "./userSlice";
import { userApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    visibilitySlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;