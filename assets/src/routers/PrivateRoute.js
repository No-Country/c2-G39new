import React from "react";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  return localStorage.getItem("user_token");
};

const PrivateRoute = ({ children }) => {
  let auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
