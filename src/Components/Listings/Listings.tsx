import React from "react";
import Listing from "./Listing";
import "./Listings.css";
import { ListingStoreImpl } from "../../Stores/ListingStore";

interface ListingStoreProps {
    listingStore: ListingStoreImpl
}

const Listings: React.FC<ListingStoreProps> = ({listingStore}) => {
    return (
        <>  
            <div className="listings">
                <h2 className="lobster-text">All Listings</h2>
                <div className="listings-container">
                    {listingStore.listings.map(listing => {
                        return <Listing key={listing.id} listing={listing} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Listings;