import React from "react";
import "./Banner.css";

const Banner: React.FC = () => {
    return (
        <div className="banner-div">
            <img className="banner" src={"Images/Logo/cars-banner.jpg"} alt="cars-banner"></img>
            <img className="logo" src={"Images/Logo/Wheely-Deally.png"} alt="logo"></img>
        </div>
    )
}

export default Banner