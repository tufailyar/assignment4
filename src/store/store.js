import { configureStore } from "@reduxjs/toolkit";
import myreducer from "./doctorSlice"
export const store=configureStore({
  reducer:{
    registration:myreducer,
  },
});