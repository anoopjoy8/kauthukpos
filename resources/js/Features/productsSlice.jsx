import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsLoading: false,
    products : null,
    productsError : false,
    productsSuccess : null,
    productsModal : false
};

const productsSlice = createSlice({
  name: "prodcutsState",
  initialState,
  reducers: {
    productsReq: (state, action) => {
      state.productsLoading = true;
    },
    productsSuccess: (state, action) => {
      state.productsLoading = false;
      state.products = action.payload;
    },
    productsFail: (state, action) => {
      state.productsLoading = false;
      state.productsError = action.payload;
      state.productsModal = true;
    },
    productsModal: (state, action) => {
      state.productsModal = false;
    },
  },
});

export const { productsReq, 
    productsSuccess, 
    productsFail, 
    productsModal
} = productsSlice.actions;
export default productsSlice.reducer;
