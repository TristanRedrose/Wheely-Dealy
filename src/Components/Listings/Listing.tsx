import React from "react";
import { CarListing } from "../../Types/listing.type";

interface ListingProps {
    listing: CarListing
}

const ListingComponent: React.FC<ListingProps> = ({listing}) => {
    return (
        <>
            <div className="listing-container">
                <div className="listing-image-container">
                    <img src={listing.image} className="listing-image" alt="car-showcase"></img>
                </div>
                <div className="listing-info">
                    <h5>{listing.make}</h5>
                    <p>{listing.type}</p>
                    <p className="price-text">${listing.price}</p>
                </div>
            </div>
        </>
    )
}

export default ListingComponent;