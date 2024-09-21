import {React, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Text from '../Components/inputComponents/Text'
import DropDownOne from '../Components/inputComponents/DropDownOne'
import EmailOne from '../Components/inputComponents/EmailOne'
import PasswordOne from '../Components/inputComponents/PasswordOne'
import { getAllAdminUserRolesList, addAdminUsers } from "../Actions/adminUserAction";
import Loading from '../Components/Common/Loader.jsx'
import ModalPopup from "../Components/Common/Modal/ModalPopup.jsx";
import SubmitButton from "../Components/inputComponents/submitButton.jsx";
 
function AddUser() {
    const data = useSelector((state) => state);
    const {adminUserRoleError,
        adminuserRolesLoading,
        adminUserRoles,
        addAdminUserModal,
        adminUserRoleModal,
        addAdminUserError,
        addAdminUserLoading,
        addAdminUserModalSucces,
        addAdminUserSuccess
    } = data.adminUser;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllAdminUserRolesList());
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password : '',
        role : ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password : '',
        role : ''
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({
              ...prevErrors,
              [name]: ''
            }));
        }
    };
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }else if (!formData.password) {
            newErrors.password = 'Password is invalid';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            dispatch(addAdminUsers(formData));
        }
    };
    const showModal = addAdminUserModal || adminUserRoleModal || addAdminUserModalSucces;
    const modalBody = addAdminUserModal ? addAdminUserError 
        : adminUserRoleError ? adminUserRoleError
        : "User Created Successfully"
    const modalType = addAdminUserModal ? 'error'
        : adminUserRoleError ? 'error'
        : 'success';
    const modalTitle = modalType == "error" ? "An error Occured" : "Success";
    return (
        <div className="card">
            <ModalPopup 
                showModal={showModal} 
                title = {modalTitle}
                body={modalBody}
                modalType = {modalType}
            />
            <div className="card-body">
                <h4 className="card-title">Add User</h4>
                {(adminuserRolesLoading || addAdminUserLoading) ? <Loading /> : null}
                <form className="forms-sample" onSubmit={handleSubmit}>
                    <Text title = "Name"
                        name="name"
                        id = "name"
                        value = ""
                        placeHolder = "Name"
                        required = "true"
                        error={errors.name}
                        onChange={handleInputChange}
                    />
                    <DropDownOne title = "Role"
                        name="role"
                        id="role"
                        value=""
                        placeHolder = "select one role"
                        data={adminUserRoles?.data || []}
                        required = "true"
                        error={errors.role}
                        onChange={handleInputChange}
                    />
                    <EmailOne title="Email"
                        name="email"
                        id = "email"
                        value=""
                        placeHolder = "Email"
                        required = "true"
                        error={errors.email}
                        onChange={handleInputChange}
                    />
                    <PasswordOne title="Password"
                        name="password"
                        id = "password"
                        value=""
                        placeHolder = "Password"
                        required = "true"
                        error={errors.password}
                        onChange={handleInputChange}
                    />
                    <SubmitButton/>
                </form>
            </div>
        </div>
    )
}

export default AddUser
