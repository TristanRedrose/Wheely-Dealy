import React, { useContext } from "react";
import { createContext } from "react";
import {rootStore, RootStore} from "../Stores/RootStore"

const StoresContext = createContext<RootStore>({} as RootStore);

export const StoresProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    return <StoresContext.Provider value={rootStore}>
        {children}
    </StoresContext.Provider>
}

export const useRootStore = () => useContext(StoresContext);