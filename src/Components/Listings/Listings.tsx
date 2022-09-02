import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import "./Listings.css";
import { ListingStoreImpl } from "../../Stores/ListingStore";
import { CarListing } from "../../Types/listing.type";
import Pagination from "./Pagination/Pagination";

interface ListingStoreProps {
    listingStore: ListingStoreImpl
}

const Listings: React.FC<ListingStoreProps> = ({listingStore}) => {

    let [currentList, setCurrentList] = useState<CarListing[]>([])

    let [page, setPage] = useState<number>(1)
    let listingsPerPage: number = 8
    let maxPages: number = Math.ceil(listingStore.listings.length / listingsPerPage)
    
    useEffect(() => {
        setCurrentList(currentList = listingStore.listings.slice((page - 1) * 8, page* 8))
    }, [page])

    return (
        <div className="listings">
            <div className="listing-title">
                <h2 className="lobster-text">All Listings</h2>
                <h5 className="page-info">Page {page} of {maxPages}</h5>
            </div>
            <div className="listings-container">
                {currentList.map(listing => {
                    return <Listing key={listing.id} listing={listing} />
                })}
            </div>
            <div className="pagination-box">
                <h5 className="page-info">Page {page} of {maxPages}</h5>
                <Pagination setPage={setPage} page={page} maxPages={maxPages} />
            </div>
        </div>
    )
}

export default Listings;