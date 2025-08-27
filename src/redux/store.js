import { configureStore } from "@reduxjs/toolkit";
import calcReducer from "./slices/slices";

const store = configureStore({
  reducer: {
    calculator: calcReducer,
  },
});

export default store;
