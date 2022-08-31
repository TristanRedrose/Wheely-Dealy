import React from "react";

const Listing: React.FC = () => {
    return (
        <>
            <div className="listing-container">
                <div className="listing-info">
                    <h3>Make: BMW</h3>
                    <h3>Model: Alistair 736</h3>
                    <h3>Price: 123 000 $</h3>
                </div>
                <div className="listing-image-container">
                    <img src="Images/About/sunset-car.jpg" className="listing-image" alt="car-showcase"></img>
                </div>
            </div>
        </>
    )
}

export default Listing;