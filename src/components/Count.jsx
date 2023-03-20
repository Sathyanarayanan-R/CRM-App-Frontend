import React, { useEffect  } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoadService, LoadContact, LoadLead } from "./actions/index";

const ServiceRequest = () => {

    const dispatch = useDispatch();

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE0NTI0ZDM0NmM3ODBiZmMxMmIwZjgiLCJpYXQiOjE2NzkwNTM0MTV9.WYXgOUnLAN_ToWIwTbecgKwxLViP3oWm_JPL6DMignk";

    useEffect(() => {

        const getServiceRequest = async () => {

            const url = "https://crm-app-backend.onrender.com/api/admindashboard/servicerequest";
    
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
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    
        const getLeads = async () => {
            const url = "https://crm-app-backend.onrender.com/api/admindashboard/lead";
            axios({
                url: url,
                method: "get",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    dispatch(LoadLead(response.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    
        const getContacts = () => {
            const url = "https://crm-app-backend.onrender.com/api/admindashboard/contact";
            axios({
                url: url,
                method: "get",
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    dispatch(LoadContact(response.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getServiceRequest();
        getLeads();
        getContacts();

    }, [dispatch, token]);

    return (<></>);
};

export default ServiceRequest;
