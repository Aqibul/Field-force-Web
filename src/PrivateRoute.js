// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...props }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Route {...props} element={<Element />} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
