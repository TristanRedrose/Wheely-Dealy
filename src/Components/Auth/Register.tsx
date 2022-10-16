import { observer } from "mobx-react-lite";
import React from "react";
import { Link} from "react-router-dom";
import { useAuthStore } from "../../Context/AuthContext";
import "./Auth.css";

const Register: React.FC = observer(() => {

    const {register, setAuthData} = useAuthStore();


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
                        <input name="username" className="auth-input" type="text" placeholder="Username" onChange={(e) => setAuthData(e)} />
                    </div>
                    <div className="auth-input-div">
                        <input name="email" className="auth-input" type="text" placeholder="Email" onChange={(e) => setAuthData(e)} />
                    </div>
                    <div className="auth-input-div">
                        <input name="password" className="auth-input" type="password" placeholder="Password" onChange={(e) => setAuthData(e)} />
                    </div>
                    <div className="auth-input-div">
                        <input name="confirm" className="auth-input" type="password" placeholder="Confirm Password" onChange={(e) => setAuthData(e)} />
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