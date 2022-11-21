import { observer } from "mobx-react-lite";
import React, {useEffect} from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useRootStore } from "../../Context/StoresContext";

const ListingRoutes: React.FC = observer(() => {

    const { sessionStore } = useRootStore()
    const { sessionActive, isSessionActive } = sessionStore;

    useEffect(() => {
        isSessionActive();
    },[isSessionActive]);

    return (
        !sessionActive ? <Navigate to="/" /> : <Outlet />
    )
})

export default ListingRoutes;