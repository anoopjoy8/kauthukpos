import React from 'react'
import '../../../Assets/css/style.css';
import Minilogo from '../../../Assets/images/logo-mini.svg';
import { logout } from "../../Actions/loginActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const OnMenuClick = (e) => {
        e.preventDefault();
        props.onDataFromChild('jj');
    };
    const logoutHandler = (e) =>{
        dispatch(logout());
        navigate("/login");
    }
    return (
        <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                <span className="mdi mdi-chevron-double-left"></span>
            </button>
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a className="navbar-brand brand-logo-mini" href="index.html"><img src={Minilogo} alt="logo"/></a>
            </div>
            <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item nav-profile dropdown d-none d-md-block">
                <span className="nav-link dropdown-toggle logout" id="profileDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="nav-profile-text" onClick={logoutHandler}>Logout </div>
                </span>
                <div className="dropdown-menu center navbar-dropdown" aria-labelledby="profileDropdown">
                    <a className="dropdown-item" href="#">
                    <i className="flag-icon flag-icon-bl me-3"></i> French
                    </a>
                    <div className="dropdown-divider"></div>
                </div>
                </li>
                <li className="nav-item nav-logout d-none d-lg-block">
                <a className="nav-link" href="index.html">
                    <i className="mdi mdi-home-circle"></i>
                </a>
                </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" 
                type="button" 
                data-toggle="offcanvas"
                onClick={OnMenuClick}
            >
                <span className="mdi mdi-menu"></span>
            </button>
            </div>
        </nav>
    )
}

export default Header
