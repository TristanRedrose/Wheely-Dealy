import React from "react";
import "./Banner.css";

const Banner: React.FC = () => {
    return (
        <div className="banner-div">
            <img className="banner" src="Images/Logo/cars-banner.jpg" alt="cars-banner" />
            <img className="logo" src="Images/Logo/Wheely-Dealy.png" alt="logo" />
        </div>
    )
}

export default Banner