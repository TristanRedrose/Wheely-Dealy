import React, { useContext } from "react";
import { createContext } from "react";
import { listingStore, ListingStore } from "../Stores/ListingStore";

const ListingsContext = createContext<ListingStore>({} as ListingStore);

export const ListingsProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {

    return <ListingsContext.Provider value={listingStore}>
        {children}
    </ListingsContext.Provider>
}

export const useListingsStore = () => useContext(ListingsContext);