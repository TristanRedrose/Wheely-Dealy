import React from "react";
import Listing from "./Listing";
import "./Listings.css";

const Listings: React.FC = () => {
    return (
        <>  
            <div className="listings">
                <h2 className="lobster-text">All Listings</h2>
                <div className="listings-container">
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                    <Listing></Listing>
                </div>
            </div>
        </>
    )
}

export default Listings;