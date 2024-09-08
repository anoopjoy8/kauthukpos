import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Util/LoginUtil";
function LoginOutlet() {
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
     return <Navigate to='login' />;
  }
}

export default LoginOutlet;