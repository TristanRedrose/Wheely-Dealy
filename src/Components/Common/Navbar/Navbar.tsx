import React from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";

const NavbarComponent: React.FC = () => {
    return (
        <div className="nav-container">
            <div className="navbar">
                <Link className="title-link" to="/">
                    <div className="">
                        <h3 className="lobster-text">Wheely-Deally</h3>
                    </div>
                </Link>
                <div>
                    <ul>
                        <li>
                            <NavLink 
                                className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                to="/">
                                    Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                to="listings">
                                    Listings
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent