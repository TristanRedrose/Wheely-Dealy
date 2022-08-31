import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About: React.FC = () => {
    return (
        <div className="section-box">
            <div>
                <h2>Welcome to Wheely-Deally, an online car listing, where the best deals are only a few clicks away</h2>
            </div>
            <div className="about-container">
                <div className="about-box">
                    <img className="about-image" src="Images/About/browse.webp" alt="Browse"></img>
                    <h2 className="lobster-text">Step 1</h2>
                    <h3>Browse for your desired vehicle</h3>
                </div>
                <div className="about-box">
                    <img className="about-image" src="Images/About/agreeing-deal.jpg" alt="Agreeing"></img>
                    <h2 className="lobster-text">Step 2</h2>
                    <h3>Contact the listing provider and agree to a price</h3>
                </div>
                <div className="about-box">
                    <img className="about-image" src="Images/About/sunset-car.jpg" alt="Drive-off"></img>
                    <h2 className="lobster-text">Step 3</h2>
                    <h3>Drive into the sunset in your new car</h3>
                </div>
            </div>
            <Link to="listings">
                <div className="button-div">
                    <h3 className="lobster-text">Browse now</h3>
                </div>
            </Link>
        </div>
    )
}

export default About