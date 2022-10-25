import React, {useEffect} from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "../../../Context/AuthContext";
import { observer } from "mobx-react-lite";
import Modal from "../Modal/Modal";
import { useModalStore } from "../../../Context/ModalContext";

const NavbarComponent: React.FC = observer(() => {

    const {authorised, logOut, isAuthorised} = useAuthStore();
    const {toggleModal} = useModalStore();

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
                                    onClick={(e) => {e.preventDefault(); toggleModal()}}>
                                    Logout
                                </NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            <Modal>
                <h4>Are you sure you want to log out?</h4>
                <div className="modal-button-box">
                    <div className="modal-button" onClick={()=> toggleModal()}>
                        Return
                    </div>
                    <div className="modal-button" onClick={()=> {logOut(); toggleModal()}}>
                        Logout
                    </div>
                </div>
            </Modal>
        </div>
    )
})

export default NavbarComponent