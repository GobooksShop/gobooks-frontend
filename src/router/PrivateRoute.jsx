import React from "react";
import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = () => {

  const useAuthenticate = () => {
    const accessToken = localStorage.getItem("accessToken") || null;
    console.log(accessToken);
    if(accessToken !== null){
      return true;
    }
    return false;
  }

  return useAuthenticate() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;