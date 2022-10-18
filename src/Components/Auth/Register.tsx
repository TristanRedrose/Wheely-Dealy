import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link} from "react-router-dom";
import { useAuthStore } from "../../Context/AuthContext";
import "./Auth.css";

const Register: React.FC = observer(() => {

    const {register, setAuthData, clearData, errorMessage, errorCode, username, checkUser, userNameTaken} = useAuthStore();

    useEffect(() => {
        return () => clearData() 
    },[clearData])

    useEffect(() => {
        const userCheckTimeout = setTimeout(() => checkUser(username), 300);

        return () => clearTimeout(userCheckTimeout);
    },[checkUser, username])

    return (
        <div className="auth-body">
            <div className="auth-form-container">
                <Link to="/">
                    <img className="auth-logo" src="../Images/Logo/Wheely-Deally.png" alt="cars-banner" />
                </Link>
                <div className="auth-title-div">
                    <h2 className="lobster-text">Register</h2>
                </div>
                <form className="auth-form" onSubmit={(e) => {e.preventDefault(); register()}}>
                    <div className="auth-input-div">
                        <input name="username" className={(errorCode === 1) ? "auth-input error" : "auth-input"} type="text" placeholder="Username" onChange={(e) => setAuthData(e)} />
                        {errorCode === 1 && <p className="error-text">{errorMessage}</p>}
                        {userNameTaken && <p className="error-text">Username already taken</p>}
                    </div>
                    <div className="auth-input-div">
                        <input name="email" className={(errorCode === 2) ? "auth-input error" : "auth-input"} type="text" placeholder="Email" onChange={(e) => setAuthData(e)} />
                        {errorCode === 2 && <p className="error-text">{errorMessage}</p>}
                    </div>
                    <div className="auth-input-div">
                        <input name="password" className={(errorCode === 3 || errorCode === 5) ? "auth-input error" : "auth-input"} type="password" placeholder="Password" onChange={(e) => setAuthData(e)} />
                        {errorCode === 3 && <p className="error-text">{errorMessage}</p>}
                    </div>
                    <div className="auth-input-div">
                        <input name="confirm" className={(errorCode === 4 || errorCode === 5) ? "auth-input error" : "auth-input"} type="password" placeholder="Confirm Password" onChange={(e) => setAuthData(e)} />
                        {(errorCode === 4 || errorCode === 5) && <p className="error-text">{errorMessage}</p>}
                    </div>
                    <div className="auth-input-div">
                        <input className="auth-submit-button" type="submit" value="Register"/>
                    </div>
                    <div className="auth-text-div">
                        <p>Already a member?</p>
                        <Link className="auth-link" to="/login">
                            <p>Login</p>
                        </Link> 
                    </div>
                </form>
            </div>
        </div>
    )
});

export default Register;