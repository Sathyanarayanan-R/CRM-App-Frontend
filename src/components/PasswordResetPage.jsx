import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import './error.css';

import Illustration from "../assets/illustration.png";

const PasswordResetPage = () => {

    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const param = useParams();
    const url = `https://crm-app-backend.onrender.com/api/password-reset/${param.id}/${param.token}`;

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        }
        verifyUrl();
    }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(url, { password, confirmPassword });
            setMsg(data.message);
            setError("");
            window.location("/login");
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
                setMsg("");
            }
        }
    }

    return (
        <>
            {validUrl ? (
                <div className="login-container">
                    <div className="flexbox">
                        <div className="illustrator">
                            <img src={Illustration} alt="illustration" />
                        </div>
                        <div className="login">
                            <div className="headliner">Reset Your Password</div>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                            />
                            {error && <div className="error_msg">{error}</div>}
                            {msg && <div className="success_msg">{msg}</div>}
                            <button type="button" onClick={handleSubmit}>
                                Submit
                            </button>
                            <div>
                                <Link to="/" className="small">Resetted Your Password? Login!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    );
};

export default PasswordResetPage;
