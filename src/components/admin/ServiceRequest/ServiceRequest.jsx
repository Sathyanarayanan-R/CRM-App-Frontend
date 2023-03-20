import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidenav from "../Sidenav";
import { useSelector } from "react-redux";
import LoaderTemplate from "../templates/LoaderTemplate";
import TitleTemplate from "../templates/TitleTemplate";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoadService } from "../../actions/index";

const ServiceRequest = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const results = useSelector((state) => state.service);

  useEffect(() => {
    const url =
      "https://crm-app-backend.onrender.com/api/admindashboard/servicerequest";
    const getServiceRequest = async () => {
      const token = localStorage.getItem("token");
      axios({
        url: url,
        method: "get",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          dispatch(LoadService(response.data));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    getServiceRequest();
  }, [dispatch]);

  return (
    <React.Fragment>
      {isLoading && (
        <LoaderTemplate
          title={`Service Request`}
          isAdd={true}
          link={`/admindashboard/servicerequest/add`}
          content={`Loading`}
        />
      )}
      {!isLoading && (
        <div className="dashboard">
          <div className="sidebar">
            <Sidenav isLoading = {isLoading}/>
          </div>
          <div className="main-content">
            <TitleTemplate
              title={`Service Request`}
              link={`/admindashboard/servicerequest/add`}
              isAdd={true}
            />
            <div className="content">
              <ul>
                {results.map((result) => (
                  <li key={result._id}>
                    <p>{result.title}</p>
                    <Link to={`/admindashboard/servicerequest/${result._id}`}>
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

export default ServiceRequest;
