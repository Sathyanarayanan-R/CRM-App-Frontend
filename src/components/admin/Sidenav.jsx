import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const delToken = () => {
  localStorage.removeItem("token");
};

const Sidenav = () => {

  const result1 = useSelector((state) => state.service);
  const result2 = useSelector((state) => state.lead);
  const result3 = useSelector((state) => state.contact);
 
  return (
    <React.Fragment>
      <nav className="nav">
        <ul>
          <li>
            <NavLink
              to="/admindashboard/servicerequest"
              className="nav-items"
              activeClassName={`nav-items active`}
            >
              Service Request
              <span style={{ margin: "0 15px", display: "inline-block", width: "25px", textAlign: "center", backgroundColor: "white", color: "red", borderRadius: "20px" }}>{result1.length}</span>
            </NavLink>

          </li>
          <li>
            <NavLink
              to="/admindashboard/lead"
              className="nav-items"
              activeClassName={`nav-items active`}
            >
              Leads
              <span style={{ margin: "0 15px", display: "inline-block", width: "25px", textAlign: "center", backgroundColor: "white", color: "red", borderRadius: "20px" }}>{result2.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/contact"
              className="nav-items"
              activeClassName={`nav-items active`}
            >
              Contacts
              <span style={{ margin: "0 15px", display: "inline-block", width: "25px", textAlign: "center", backgroundColor: "white", color: "red", borderRadius: "20px" }}>{result3.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admindashboard/allusers"
              className="nav-items"
              activeClassName={`nav-items active`}
            >
              All Users
            </NavLink>
          </li>
          <li>
            <Link onClick={() => delToken()} to="/" className="nav-items">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Sidenav;
