import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useVerifyAuth } from '../../../hooks/useVerifyAuth'
interface ProtectedRoutesProps {
    redirectPath?: string;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = () => {
    const {isError, error} = useVerifyAuth();  

    if(isError) {
        console.log('navigating to sign in');
        return <Navigate to="/sign-in"/>
    }else {
        return <Outlet/>
    }
    
}

export default ProtectedRoutes;
