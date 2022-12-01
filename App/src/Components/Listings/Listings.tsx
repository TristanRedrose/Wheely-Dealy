import React from "react";
import { observer } from "mobx-react-lite"
import { useRootStore } from "../../Context/StoresContext";
import "./Listings.css";
import Listing from "./Listing";
import ListingsFilterSort from "./FilterSort/FilterSort";
import Pagination from "./Pagination/Pagination";
import LoadingCircle from "../Common/Loading/LoadingCircle";
import { usePagingParams } from "../../Utils/CustomHooks/UsePagingParams";

const Listings: React.FC = observer(() => {

    const {listingsPageStore} = useRootStore();
    const {isLoading, listings, maxPages} = listingsPageStore;

    usePagingParams();

    return (
        <>
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                <ListingsFilterSort />
            </div>
            <div className="listings-screen">
                {isLoading && 
                <div className="loading-container">
                    <LoadingCircle/>
                </div>}
                {!isLoading && <div className="listings-container">
                    {listings.map(listing => {
                        return (
                            <Listing key={listing._id} listing={listing} />
                        )
                    })}
                    {maxPages === 0 && <h3>No listings found</h3>}
                </div>}
            </div>
            {!isLoading && maxPages > 0 && <div className="pagination-box">
                <Pagination />
            </div>}
        </>
    )
})

export default Listings;