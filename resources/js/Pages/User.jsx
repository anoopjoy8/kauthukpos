import {React, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminUsers } from "../Actions/adminUserAction";
import Loading from '../Components/Common/Loader.jsx'
import Table from "../Components/inputComponents/Table.jsx";
import '../../Assets/css/developer.css';
import ModalPopup from "../Components/Common/Modal/ModalPopup.jsx";
function User() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { adminUserLoading,adminUserError, adminUser, adminUserModal } = data.adminUser;
  useEffect(() => {
    dispatch(getAdminUsers());
  }, []);
  const tableHeaders = [
    {Title: 'Name', value: 'Name', type: 'text'},
    {Title: 'Role', value: 'Role', type: 'num'},
    {Title: 'Status', value: 'Status', type: 'status'}
  ];
  return (
    <>
      <ModalPopup 
        showModal = {adminUserModal}
        title = "An error Occured"
        body = {adminUserError}
        modalType = "error"
      />
      {adminUserLoading ? <Loading /> : null}
        <Table headers = {tableHeaders}
          data={adminUser?.data || []}
          addButtonLink = "/add-user"
        />
    </>
  );
}

export default User;
