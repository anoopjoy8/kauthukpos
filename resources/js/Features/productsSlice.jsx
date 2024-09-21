import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productsLoading: false,
    products : null,
    productsError : false,
    productsSuccess : null,
    productsModal : false,
    productsLoadMore : false,
    productsLimit : 20,
    productCategories : null,
    productSubCategories : null,
    productCategoryLoading : false,
    productCategoriesError : false,
    addProductError : false,
    addProductSuccess: false,
    productCategoriesErrorModal : false,
    addProductModalSucces : false,
    addProductModalError : false,
    addProductLoading : false,
    productSubCategoriesError : null,
    productSubCategoriesLoading : false,
    productData : null,
    productDataLoading : false,
    productDataError : null,
    productDataModalError : false,
    updateProductSuccessMessage : '',
    updateProductSuccess : false,
    updateProductErrorMessage : '',
    updateProductErrorState : false,
    updateProductLoading : false
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
      if(action.payload.search !== "") {
        state.products = action.payload;
      }else if (state.products && state.products.data) {
        state.products.data = [...state.products.data, ...action.payload.data];
      }else{
        state.products = {
          ...action.payload,
          data: [...(action.payload.data || [])]
        };
      }


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
    },
    productCategoriesReq : (state, action) => {
      state.productCategoryLoading = true;
    },
    productCategoriesSuccess : (state, action) => {
      state.productData = null;
      state.productCategories = action.payload;
      state.productCategoryLoading = false;
      state.productCategoriesError = false;
    },
    productCategoriesError : (state, action) => {
      state.productCategoryLoading = false;
      state.productCategoriesError = action.payload;
      state.productCategoriesErrorModal = true;
    },
    procuctCategorySelect : (state, action) => {
      state.productSubCategoriesLoading = true;
    },
    procuctCategorySelectSuccess : (state, action) => {
      state.productSubCategories = action.payload;
      state.productSubCategoriesLoading = false;
    },
    procuctCategorySelectError : (state, action) => {
      state.productSubCategoriesLoading = false;
      state.productSubCategoriesError = action.payload;
    },
    addProductReq : (state, action) => {
      state.addProductLoading = true;
    },
    addProductSuccess : (state,action) => {
      state.addProductLoading = false;
      state.addProductSuccess = action.payload;
      state.addProductModalSucces = true; 
    },
    addProductError : (state, action) => {
      state.addProductLoading = false;
      state.addProductModalError = true;
      state.addProductError = action.payload;
    },
    setAddProductModal : (state, action) => {
      state.addProductModalSucces = false;
      state.addProductModalError = false;
    },
    editProductReq : (state, action)  => {
      state.productDataLoading = true;
    },
    editProductSuccess : (state, action) => {
      state.productDataLoading = false;
      state.productData = action.payload;
    },
    editProductError : (state, action) => {
      state.productDataError = true;
      state.productDataModalError = true;
    },
    updateProductReq : (state, action) => {
      state.updateProductLoading = true;
    },
    updateProductSuccess : (state, action) => {
      state.updateProductLoading = false;
      state.updateProductSuccess = true;
      state.updateProductSuccessMessage = action.payload;
    },
    updateProductError : (state, action) => {
      state.updateProductErrorState = true;
      state.updateProductLoading = false;
      state.updateProductErrorMessage = action.payload;
    }
  },
});

export const { productsReq, 
    productsSuccess, 
    productsFail, 
    productsModal,
    productsLoadMoreLoading,
    productCategoriesReq,
    productCategoriesSuccess,
    productCategoriesError,
    procuctCategorySelect,
    procuctCategorySelectSuccess,
    procuctCategorySelectError,
    addProductReq,
    addProductSuccess,
    addProductError,
    setAddProductModal,
    editProductReq,
    editProductSuccess,
    editProductError,
    updateProductReq,
    updateProductSuccess,
    updateProductError
} = productsSlice.actions;
export default productsSlice.reducer;
