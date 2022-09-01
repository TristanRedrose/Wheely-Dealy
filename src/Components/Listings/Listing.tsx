import React from "react";

const Listing: React.FC = () => {
    return (
        <>
            <div className="listing-container">
                <div className="listing-image-container">
                    <img src="Images/Cars/mercedes.jpg" className="listing-image" alt="car-showcase"></img>
                </div>
                <div className="listing-info">
                    <h5>BMW</h5>
                    <p>Alistair 736</p>
                    <p className="price-text">$123 000</p>
                </div>
            </div>
        </>
    )
}

export default Listing;