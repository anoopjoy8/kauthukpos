import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  productsFail,
  productsReq,
  productsSuccess,
  productsModal,
  productCategoriesReq,
  productCategoriesSuccess,
  productCategoriesError,
  procuctCategorySelect,
  procuctCategorySelectSuccess,
  procuctCategorySelectError,
  addProductReq,
  addProductSuccess,
  setAddProductModal,
  addProductError,
  editProductReq,
  editProductSuccess,
  editProductError,
  updateProductReq,
  updateProductSuccess,
  updateProductError
} from "../Features/productsSlice";
import { Search } from "lucide-react";

export const getAllProducts = (limit,offset,search) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };

    dispatch(productsReq());
    
    const { data } = await axiosConfig.get(`${c.GET_ALL_PRODUCTS}?limit=${limit}&offset=${offset}&search=${JSON.stringify(search)}`,
      config
    );
    dispatch(productsSuccess(data,offset,search));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(productsFail("An error occurred while fetching Data"));
     setTimeout(() => {
       dispatch(productsModal());
     }, 5000);
  }
};
export const getAllProductCategories = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(productCategoriesReq());
    const { data } = await axiosConfig.get(c.GET_All_PRODUCT_CATEGORIES,config);
    dispatch(productCategoriesSuccess(data));
  } catch (error) {
    dispatch(productCategoriesError("An error occurred while fetching Data"));
  }
};

export const onProductCategorySelect = (category) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(procuctCategorySelect());
    const { data } = await axiosConfig.get(`${c.GET_PRODUCT_SUB_CATEGORIES}${category}`, config);
    dispatch(procuctCategorySelectSuccess(data));
  } catch (error) {
    dispatch(procuctCategorySelectError("An error occurred while fetching Data"));
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };

    dispatch(addProductReq());
    const { data } = await axiosConfig.post(
      c.ADD_PRODUCT,
      {
        formData : formData
      },
      config
    );
    dispatch(addProductSuccess('Product added Succesfully'));
    setTimeout(() => {
      dispatch(setAddProductModal());
    }, 5000);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addProductError("An error occurred while Creating Product"));
    setTimeout(() => {
      dispatch(setAddProductModal());
    }, 5000);
  }
};

export const editProduct = (productID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(editProductReq());
    const { data } = await axiosConfig.get(`${c.EDIT_PRODUCT}${productID}`, config);
    dispatch(editProductSuccess(data));
  } catch (error) {
    dispatch(editProductError("An error occurred while fetching Data"));
  }
};

export const updateProduct = (formData,ID) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };

    dispatch(updateProductReq());
    const { data } = await axiosConfig.post(
      c.UPDATE_PRODUCT,
      {
        productID : ID,
        formData : formData
      },
      config
    );
    dispatch(updateProductSuccess('Product Updated Succesfully'));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(updateProductError("An error occurred while Creating Product"));
  }
};