import React, { useContext } from "react";
import { createContext } from "react";
import { ListingStore, ListingStoreImpl } from "../Stores/ListingStore";

const ListingsContext = createContext<ListingStoreImpl>({} as ListingStoreImpl);

export const ListingsProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    return <ListingsContext.Provider value={ListingStore}>
        {children}
    </ListingsContext.Provider>
}

export const useListingsStore = () => useContext(ListingsContext);