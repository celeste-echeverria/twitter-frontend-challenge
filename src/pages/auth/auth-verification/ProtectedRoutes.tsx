import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useHttpRequestService } from "../../../service/HttpRequestService";

interface ProtectedRoutesProps {
    redirectPath?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ redirectPath = '/sign-in'}) => {
    const httpRequestService = useHttpRequestService();
    const isAuth = httpRequestService.verifyAuth();  

    if (!isAuth){
        return <Navigate to={redirectPath} replace />
    }else{
        return <Outlet/>
    }

    
}

export default ProtectedRoutes;
