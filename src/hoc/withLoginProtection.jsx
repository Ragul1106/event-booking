import React from "react";
import { Navigate } from "react-router-dom";

export default function withLoginProtection(Component) {
  return function Protected(props) {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    return user ? <Component {...props} /> : <Navigate to="/login" />;
  };
}
