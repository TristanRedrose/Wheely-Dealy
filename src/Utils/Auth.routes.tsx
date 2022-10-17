import { observer } from "mobx-react-lite";
import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../Context/AuthContext";

const AuthRoutes: React.FC = observer(() => {

    const {authorised, isAuthorised} = useAuthStore();

    useEffect(() => {
        isAuthorised();
    },[isAuthorised]);

    return (
        authorised ? <Navigate to="/" /> : <Outlet />
    )
})

export default AuthRoutes;