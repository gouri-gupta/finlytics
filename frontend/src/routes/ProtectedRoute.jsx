import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { isLogin } = useContext(userContext);

  // If NOT logged in → redirect to login
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → allow access
  return children;
};

export default ProtectedRoute;

/*
Profile,Dashboard,Transactions are protected routes

How it works?
User tries to access /dashboard

→ ProtectedRoute checks isLogin

IF false:
   → Redirect to /login

IF true:
   → Show dashboard
*/

