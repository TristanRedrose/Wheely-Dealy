import React, {useEffect} from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../../Context/StoresContext";

const NavbarComponent: React.FC = observer(() => {

    const {sessionStore, modalStore} = useRootStore();
    const {sessionActive, isSessionActive} = sessionStore;
    const {toggleLoginModal} = modalStore;

    useEffect(() => {
        isSessionActive();
    },[isSessionActive]);

    return (
        <div className="nav-container">
            <div className="navbar">
                <Link className="title-link" to="/">
                    <div className="">
                        <h3 className="lobster-text">Wheely-Dealy</h3>
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
                        {sessionActive &&
                            <li>
                                <NavLink 
                                    className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                    end to="/listings/form">
                                        Add Listing
                                </NavLink>
                            </li>
                        }
                        {!sessionActive &&
                            <li>
                                <NavLink 
                                    className={({isActive}) => isActive ? "router-link active" : "router-link"} 
                                    to="/login">
                                        Login
                                </NavLink>
                            </li>
                        }
                        {sessionActive &&
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