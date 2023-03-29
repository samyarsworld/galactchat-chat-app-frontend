import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  // const jwt = localStorage.getItem("authToken");
  const { authenticate } = useSelector((state) => state.auth);
  return authenticate ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
