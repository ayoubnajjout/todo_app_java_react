import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function SecureWrapper({ children }) {
  const authContext = useAuth();
  return (
    <div>
      {authContext.isLogged ? <div>{children}</div> : <Navigate to="/login" />}
    </div>
  );
}
