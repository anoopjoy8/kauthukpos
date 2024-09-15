import { createSlice } from "@reduxjs/toolkit";
import { addAdminUsers } from "../Actions/adminUserAction";

const initialState = {
    adminUserLoading: false,
    adminUserRoles : null,
    adminUser: null,
    adminUserError : false,
    adminUserModal : false,
    adminuserRolesLoading : false,
    adminUserRoleError : null,
    adminUserRoleModal : false,
    addAdminUserSuccess : null,
    addAdminUserLoading : false,
    addAdminUserModal : false,
    addAdminUserError : null,
    addAdminUserModalSucces : false,

};

const adminUserSlice = createSlice({
  name: "adminUserState",
  initialState,
  reducers: {
    adminUserReq: (state, action) => {
      state.adminUserLoading = true;
    },
    adminUserSuccess: (state, action) => {
      state.adminUserLoading = false;
      state.adminUser = action.payload;
    },
    adminUserFail: (state, action) => {
      state.adminUserLoading = false;
      state.adminUserError = action.payload;
      state.adminUserModal = true;
    },
    adminUserModal: (state, action) => {
      state.adminUserModal = false;
    },
    getAllAdminUserRoles:(state, action) => {
      state.adminuserRolesLoading = false;
      state.adminUserRoles = action.payload;
    },
    adminUserRolesReq : (state, action) => {
      state.adminuserRolesLoading = true;
    },
    adminUserRoleError : (state, action) => {
      state.adminuserRolesLoading = false;
      state.adminUserRoleError = action.payload;
      state.adminUserRoleModal = true;
    },
    addAdminUserReq : (state, action) => {
      state.addAdminUserLoading = true;
    },
    addAdminUserSuccess : (state,action) => {
      state.addAdminUserLoading = false;
      state.addAdminUserSuccess = action.payload;
      state.addAdminUserModalSucces = true; 
    },
    addAdminUserError : (state,action) => {
      state.addAdminUserLoading = false;
      state.addAdminUserModal = true;
      state.addAdminUserError = action.payload
    },
    setAddAdminUserModal : (state,action) => {
      state.addAdminUserModal = false;
    },
    setAddAdminUserModalSuccess : (state, action) => {
      state.addAdminUserModalSucces = false;
    }
  },
});

export const { adminUserReq, 
  adminUserSuccess, 
  adminUserFail, 
  adminUserModal, 
  getAllAdminUserRoles, 
  adminUserRoleError,
  adminUserRolesReq,
  addAdminUserReq,
  addAdminUserSuccess,
  addAdminUserError,
  setAddAdminUserModal,
  setAddAdminUserModalSuccess
} = adminUserSlice.actions;
export default adminUserSlice.reducer;
