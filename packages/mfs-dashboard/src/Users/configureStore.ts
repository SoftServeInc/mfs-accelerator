import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import usersReducer from "./reducer";
import snacksReducer from "../Snacks/reducer";

export default function configureAppStore(initialState = {}) {
  const store = configureStore({
    reducer: combineReducers({
      users: usersReducer,
      snacks: snacksReducer,
    }),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [...getDefaultMiddleware({ immutableCheck: false })],
  });

  return store;
}
