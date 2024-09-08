import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  adminUserFail,
  adminUserReq,
  adminUserSuccess,
  adminUserModal,
  getAllAdminUserRoles,
  adminUserRoleError,
  adminUserRolesReq,
  addAdminUserReq,
  addAdminUserSuccess,
  addAdminUserError,
  setAddAdminUserModal,
  setAddAdminUserModalSuccess
} from "../Features/adminUserSlice";

export const getAdminUsers = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };

    dispatch(adminUserReq());
    
    const { data } = await axiosConfig.get(c.GET_All_AdminUser_URL,config);
    dispatch(adminUserSuccess(data));
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(adminUserFail("An error occurred while fetching Data"));
     setTimeout(() => {
       dispatch(adminUserModal());
     }, 5000);
  }
};
export const getAllAdminUserRolesList = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };
    dispatch(adminUserRolesReq());
    const { data } = await axiosConfig.get(c.GET_All_AdminUserRoles,config);
    dispatch(getAllAdminUserRoles(data));
  } catch (error) {
    dispatch(adminUserRoleError("An error occurred while fetching Data"));
  }
};
export const addAdminUsers = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${g.ACCESS_TOKEN}`
      },
    };

    dispatch(addAdminUserReq());
    console.log(formData)
    const { data } = await axiosConfig.post(
      c.CREATE_URL,
      {
        formData : formData
      },
      config
    );
    dispatch(addAdminUserSuccess(data));
    setTimeout(() => {
      dispatch(setAddAdminUserModalSuccess());
    }, 5000);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addAdminUserError("An error occurred while Creating User"));
    setTimeout(() => {
      dispatch(setAddAdminUserModal());
    }, 5000);
  }
};
