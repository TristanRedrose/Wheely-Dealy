import React, { useEffect } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../Context/StoresContext";

const Login: React.FC = observer(() => {

    const {sessionStore} = useRootStore();
    const {authStore, login} = sessionStore;
    const {setAuthData, clearData, errorCode, errorMessage} = authStore;

    useEffect(() => {
        return () => clearData() 
    },[clearData])

    return (
        <div className="auth-body">
            <div className="auth-form-container">
                <Link to="/">
                    <img className="auth-logo" src="../Images/Logo/Wheely-Deally.png" alt="cars-banner" />
                </Link>
                <div className="auth-title-div">
                    <h2 className="lobster-text">Login</h2>
                </div>
                <form className="auth-form" onSubmit={(e) => {e.preventDefault(); login()}}>
                    <div className="auth-input-div">
                        <input name="username" className={(errorCode === 1) ? "auth-input error" : "auth-input"} type="text" placeholder="Username" onChange={(e) => setAuthData(e)}/>
                        {errorCode === 1 && <p className="error-text">{errorMessage}</p>}
                    </div>
                    <div className="auth-input-div">
                        <input name="password" className={(errorCode === 2) ? "auth-input error" : "auth-input"} type="password" placeholder="Password" onChange={(e) => setAuthData(e)} />
                        {(errorCode === 2 || errorCode === 7) && <p className="error-text">{errorMessage}</p>}
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
})

export default Login;