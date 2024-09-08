import React, { useEffect } from "react";
import logo from '../../Assets/images/logo.svg';
import '../../Assets/Css/style.css';
import '../../Assets/css/loader.css'
import saveUserInfo from '../Util/LoginUtil.jsx';
import Loading from '../Components/Common/Loader.jsx'
import { logIn } from "../Actions/loginActions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const { loginLoading, LoginSuccess,loginError, userInfo } = data.logIn;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(e.target.elements.email.value, e.target.elements.password.value));
  };
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light auth-dev text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={logo} alt="logo"/>
                </div>
                {loginLoading ? <Loading /> : null}
                <h4>Hello! let's get started</h4>
                <h6 className="fw-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                      type="email"
                      name="email"
                      className="form-control form-control-lg" 
                      id="loginEmail" 
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <input 
                      type="password"
                      name="password"
                      className="form-control form-control-lg" 
                      id="loginPassword" 
                      placeholder="Password"
                    />
                  </div>
                  <button className="mt-3 d-grid gap-2 login-button" type='submit'>
                    <a 
                      className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn"
                    >
                      SIGN IN
                    </a>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
