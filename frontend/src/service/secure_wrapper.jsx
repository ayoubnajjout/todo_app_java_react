import React from "react";
import { Navigate } from "react-router-dom";

export default function SecureWrapper({ children }) {
  const token = sessionStorage.getItem('token');
  return (
    <div>
      {token ? <div>{children}</div> : <Navigate to="/login" />}
    </div>
  );
}
