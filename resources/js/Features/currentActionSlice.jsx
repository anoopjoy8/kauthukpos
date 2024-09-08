import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTitle : null,
    mainMenu: null,
    subMenu: null
};

const currentActionSlice = createSlice({
  name: "currentActionState",
  initialState,
  reducers: {
    currentActionReq: (state, action) => {
        state.currentTitle = action.payload.currentTitle;
        state.mainMenu = action.payload.mainMenu;
        state.subMenu = action.payload.subMenu;
    },
  },
});

export const { currentActionReq} = currentActionSlice.actions;
export default currentActionSlice.reducer;
