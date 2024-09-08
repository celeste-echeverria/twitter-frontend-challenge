import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useVerifyAuth } from '../../../hooks/useVerifyAuth'
interface ProtectedRoutesProps {
    redirectPath?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
    const {data, isError, error} = useVerifyAuth();  
    console.log("data", data, "iserror", isError, "error", error)
    if(isError) {
        console.log('navigating to sign in');
        return <Navigate to="/sign-in"/>
    }else {
        console.log('outlet')
        return <Outlet/>
    }
    
}

export default ProtectedRoutes;
