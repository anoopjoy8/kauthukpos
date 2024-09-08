import c from "../GlobalConstants/URL";
import axiosConfig from "../GlobalConstants/axios";
import g from "../GlobalConstants/APIConstants";
import {
  LoginFail,
  LoginReq,
  LoginSuccess,
  Logout,
} from "../Features/loginSlice";
import saveUserInfo, {
  removeUserInfo,
  saveAccessToken,
} from "../Util/LoginUtil";

export const logIn = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    dispatch(LoginReq());
    
    const { data } = await axiosConfig.post(
      c.LOGIN_URL,
      {
        email: email,
        password: password,
      },
    config);
    dispatch(LoginSuccess(data));
    saveUserInfo(data);
    setTimeout(() => {
      dispatch(LoginSuccess(null));
    }, 5000);
  } catch (error) {
    const errorIs =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(LoginFail(errorIs));
     setTimeout(() => {
       dispatch(LoginFail(null));
     }, 5000);
  }
};

export const logout = () => async (dispatch) => {
  removeUserInfo();
};

export const getRefreshToken = () => async (dispatch) => {
  try {
    const reFreshConfig = {
      headers: {
        "x-api-key": g.API_KEY,
        Authorization: `Bearer ${g.REFRESH_TOKEN}`,
      },
    };
    const { data } = await axiosConfig.post(c.RE_FRESH_URL, {}, reFreshConfig);
    saveAccessToken(data);
  } catch (error) {}
};
