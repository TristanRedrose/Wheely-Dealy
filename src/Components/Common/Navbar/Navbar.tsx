import React, {useEffect} from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../Context/StoresContext";

const NavbarComponent: React.FC = observer(() => {

    const {authStore, modalStore} = useRootStore();
    const {authorised, isAuthorised} = authStore;
    const {toggleLoginModal} = modalStore;

    useEffect(() => {
        isAuthorised();
    },[isAuthorised]);

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
                                end 
                                className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                to="/listings">
                                    Listings
                            </NavLink>
                        </li>
                        {authorised &&
                            <li>
                                <NavLink 
                                    className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                    to="/listings/add">
                                        Add Listing
                                </NavLink>
                            </li>
                        }
                        {!authorised &&
                            <li>
                                <NavLink 
                                    className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                    to="/login">
                                        Login
                                </NavLink>
                            </li>
                        }
                        {authorised &&
                            <li>
                                <NavLink 
                                    className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                    to="/logout"
                                    onClick={(e) => {e.preventDefault(); toggleLoginModal()}}>
                                    Logout
                                </NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
})

export default NavbarComponent