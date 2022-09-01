import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const NavbarComponent: React.FC = () => {
    return (
        <div className="nav-container">
            <div className="navbar">
                <div className="">
                    <h3 className="lobster-text">Wheely-Deally</h3>
                </div>
                <div>
                    <ul>
                        <li>
                            <Link className="router-link" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="router-link" to="listings">Listings</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent