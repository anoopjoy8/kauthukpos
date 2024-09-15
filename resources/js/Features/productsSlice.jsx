import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsLoading: false,
    products : null,
    productsError : false,
    productsSuccess : null,
    productsModal : false,
    productsLoadMore : false,
    productsLimit : 20
};

const productsSlice = createSlice({
  name: "prodcutsState",
  initialState,
  reducers: {
    productsReq: (state, action) => {
      state.productsLoading = true;
      state.productsLoadMore = true;
    },
    productsSuccess: (state, action) => {
      state.productsLoading = false;
      state.productsLoadMore = false;
      state.products = action.payload;
    },
    productsFail: (state, action) => {
      state.productsLoading = false;
      state.productsError = action.payload;
      state.productsModal = true;
      state.productsLoadMore = false;
    },
    productsModal: (state, action) => {
      state.productsModal = false;
    },
    productsLoadMoreLoading : (state, action) => {
      state.productsLoadMore = true;
    }
  },
});

export const { productsReq, 
    productsSuccess, 
    productsFail, 
    productsModal,
    productsLoadMoreLoading
} = productsSlice.actions;
export default productsSlice.reducer;
