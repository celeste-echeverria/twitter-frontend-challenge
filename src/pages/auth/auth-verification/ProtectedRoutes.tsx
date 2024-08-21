import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { verifyAuth } from "../../../api/services/authService";

interface ProtectedRoutesProps {
    redirectPath?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ redirectPath = '/sign-in'}) => {
    const isAuth = verifyAuth();  

    if (!isAuth){
        return <Navigate to={redirectPath} replace />
    }else{
        return <Outlet/>
    }

    
}

export default ProtectedRoutes;
