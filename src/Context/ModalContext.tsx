import React, { useContext } from "react";
import { createContext } from "react";
import { ModalStore, modalStore } from "../Stores/ModalStore";


const ModalContext = createContext<ModalStore>({} as ModalStore);

export const ModalProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    return <ModalContext.Provider value={modalStore}>
        {children}
    </ModalContext.Provider>
}

export const useModalStore = () => useContext(ModalContext);