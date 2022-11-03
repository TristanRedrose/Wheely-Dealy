import { observer } from "mobx-react-lite";
import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useRootStore } from "../Context/StoresContext";

const ListingRoutes: React.FC = observer(() => {

    const {authStore} = useRootStore()
    const {authorised, isAuthorised} = authStore;

    useEffect(() => {
        isAuthorised();
    },[isAuthorised]);

    return (
        !authorised ? <Navigate to="/" /> : <Outlet />
    )
})

export default ListingRoutes;