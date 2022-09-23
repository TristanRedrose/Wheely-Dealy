import React from "react";
import "./PageNotFound.css"
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
    return (
        <>  
            <div className="error-page-container">
                <h3>The page you were looking for could not be found, so here's a happy kitty instead.</h3>
                <div className="cat-container">
                    <img id="happy-cat-image" src="../Images/404/Happy-cat.webp" alt="happy-cat" />
                </div>
                <Link to="/" className="router-link">
                    <h3 className="lobster-text">Return</h3>
                </Link>
            </div>
        </>
    )
}

export default PageNotFound;