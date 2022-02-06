import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import transactionReducer from "./transaction/slice";
import itemReducer from "./item/slice";

export const store = configureStore({
  reducer: {
    transaction: transactionReducer,
    item: itemReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
