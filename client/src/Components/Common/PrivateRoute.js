import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
function PrivateRoute({ children }) {

  const { token } = useSelector((state) => state.auth);

  if (token) {
    return children;
  }

  return <Navigate to="/login" />;
}

export default PrivateRoute;