import React, { useEffect} from "react";
import { observer } from "mobx-react-lite"
import { useListingsStore } from "../../Context/ListingsContext";
import "./Listings.css";
import Listing from "./Listing";
import ListingsFilterSort from "./FilterSort/FilterSort";
import Pagination from "./Pagination/Pagination";



const Listings: React.FC = observer(() => {

    const {page, maxPages, listings, filter: {engine, make},getListings,clearListings, sorting:{sortBy, order},} = useListingsStore();

    useEffect(() => {
        getListings();

        return () => clearListings();
    }, [page, engine, make, sortBy, order, getListings, clearListings]);

    return (
        <div className="listings">
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                {page > 0 && <h5 className="page-info">Page {page} of {maxPages}</h5>}
                <ListingsFilterSort />
            </div>
            <div className="listings-container">
                {listings.map(listing => {
                    return <Listing key={listing.id} listing={listing} />
                })}
            </div>
            <div className="pagination-box">
                {page > 0 && <h5 className="page-info">Page {page} of {maxPages}</h5>}
                <Pagination />
            </div>
        </div>
    )
})

export default Listings;