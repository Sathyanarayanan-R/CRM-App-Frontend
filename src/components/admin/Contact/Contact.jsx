import React, { useState, useEffect } from "react";
import Sidenav from "../Sidenav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoadContact } from "../../actions/index";


const Contact = ({ match }) => {
  const [isLoading, setLoading] = useState(true);
 
  const dispatch = useDispatch();

  const results = useSelector((state) => state.contact);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = `https://crm-app-backend.onrender.com/api/admindashboard/contact`;
    const getContacts = () => {
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response.data);
          dispatch(LoadContact(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getContacts();
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav isLoading = {isLoading} />
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Contacts</div>
              <Link to="/admindashboard/contact/add">
                <button type="button">
                  Add <i className="material-icons">&#xe147;</i>
                </button>
              </Link>
            </div>
            <hr />
            <div className="loading">
              <Loader type="Audio" color="#897eff" height={100} width={100} />
              <p>Loading Contacts...</p>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav isLoading = {isLoading}/>
          </div>
          <div className="main-content">
            <div className="header">
              <div className="title">Contacts</div>
              <Link to="/admindashboard/contact/add">
                <button type="button">
                  Add <i className="material-icons">&#xe147;</i>
                </button>
              </Link>
            </div>
            <hr />
            <div className="content">
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.title}</p>
                    <Link to={`/admindashboard/contact/${result._id}`}>
                      <i className="material-icons">&#xe5c8;</i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Contact;
