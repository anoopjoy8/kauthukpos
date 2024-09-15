import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  productsFail,
  productsReq,
  productsSuccess,
  productsModal
} from "../Features/productsSlice";

export const getAllProducts = (limit,offset) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };

    dispatch(productsReq());
    
    const { data } = await axiosConfig.get(`${c.GET_ALL_PRODUCTS}?limit=${limit}&offset=${offset}`,
      config
    );
    dispatch(productsSuccess(data,offset));
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