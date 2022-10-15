import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    return (
        <div className="auth-body">
            <div className="auth-form-container">
                <Link to="/">
                    <img className="auth-logo" src="Images/Logo/Wheely-Deally.png" alt="cars-banner" />
                </Link>
                <div className="auth-title-div">
                    <h2 className="lobster-text">Login</h2>
                </div>
                <form className="auth-form">
                    <div className="auth-input-div">
                        <input name="username" className="auth-input" type="text" placeholder="Username"/>
                    </div>
                    <div className="auth-input-div">
                        <input name="password" className="auth-input" type="text" placeholder="Password"/>
                    </div>
                    <div className="auth-input-div">
                        <input className="auth-submit-button" type="submit" value="Login"/>
                    </div>
                    <div className="auth-text-div">
                        <p>Not a member?</p>
                        <Link className="auth-link" to="/register">
                            <p>Register</p>
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;