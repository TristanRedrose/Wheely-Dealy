import React, { useContext } from "react";
import { createContext } from "react";
import { authStore, AuthStore } from "../Stores/AuthStore";

const AuthContext = createContext<AuthStore>({} as AuthStore);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    return <AuthContext.Provider value={authStore}>
        {children}
    </AuthContext.Provider>
}

export const useAuthStore = () => useContext(AuthContext);