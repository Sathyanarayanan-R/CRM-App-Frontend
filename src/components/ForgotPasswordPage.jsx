import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './error.css';

import Illustration from "../assets/illustration.png";

const ForgotPasswordPage = () => {

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const url = `https://crm-app-backend.onrender.com/api/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="flexbox">
          <div className="illustrator">
            <img src={Illustration} alt="illustration" />
          </div>
          <div className="login" style={{color: 'red'}}>
            <h1>Forgot Your Password?</h1>
            <p>We get it, stuff happens. Just enter your email address below
              and we'll send you a link to reset your password!</p>
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            {error && <div className="error_msg">{error}</div>}
            {msg && <div className="success_msg">{msg}</div>}
            <button type="button" onClick={handleSubmit}>
              Reset
            </button>
            <div className="text-center">
              <Link className="small" to="/">Remember/Resetted Password? Login!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ForgotPasswordPage;
