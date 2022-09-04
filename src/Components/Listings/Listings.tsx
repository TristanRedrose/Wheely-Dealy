import React, { useEffect} from "react";
import Listing from "./Listing";
import "./Listings.css";
import { observer } from "mobx-react-lite"

import Pagination from "./Pagination/Pagination";
import { useListingsStore } from "../../Context/ListingsContext";
import ListingsFilterSort from "./FilterSort/FilterSort";

const Listings: React.FC = observer(() => {

    const listingStore = useListingsStore()

    useEffect(() => {
        listingStore.paginate()
    }, [listingStore.page, listingStore.filteredList, listingStore.listings])

    return (
        <div className="listings">
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                <h5 className="page-info">Page {listingStore.page} of {listingStore.maxPages}</h5>
                <ListingsFilterSort />
            </div>
            <div className="listings-container">
                {listingStore.currentPageList.map(listing => {
                    return <Listing key={listing.id} listing={listing} />
                })}
            </div>
            <div className="pagination-box">
                <h5 className="page-info">Page {listingStore.page} of {listingStore.maxPages}</h5>
                <Pagination />
            </div>
        </div>
    )
})

export default Listings;