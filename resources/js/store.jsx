import { configureStore } from "@reduxjs/toolkit";
import logInReducer from "./Features/loginSlice";
import currentActionReducer from "./Features/currentActionSlice";
import adminUserReducer from "./Features/adminUserSlice"
const store = configureStore({
  reducer: {
    logIn: logInReducer,
    currentAction : currentActionReducer,
    adminUser : adminUserReducer

  },
});

export default store;
