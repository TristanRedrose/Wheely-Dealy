import React from "react";
import { NavLink } from "react-router-dom";
import { CarListing } from "../../Types/listing.type";

interface ListingProps {
    listing: CarListing
}

const ListingComponent: React.FC<ListingProps> = ({listing}) => {
    return (
        <NavLink className="listing-nav" to={"" + listing._id} >
            <div className="listing-container">
                <div className="listing-image-container">
                    <img src={listing.image} className="listing-image" alt="car-showcase"></img>
                </div>
                <div className="listing-info">
                    <h5>{listing.company}</h5>
                    <p>{listing.model}</p>
                    <p className="price-text">{listing.engine} engine</p>
                    <p className="price-text">{listing.horsepower}HP</p>
                    <p className="price-text">${listing.price}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default ListingComponent;