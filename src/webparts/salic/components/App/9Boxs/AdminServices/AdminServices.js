import React, { useContext } from "react";
import "./AdminServices.css";
import HistoryNavigation from "../../Global/HistoryNavigation/HistoryNavigation";
import { AppCtx } from "../../App";
import { useNavigate } from "react-router-dom";
import { services, srvsIcons } from './boxsData';


const AdminServices = () => {
  const { defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  return (
    <>
      <HistoryNavigation>
        <p>Admin Services Center</p>
      </HistoryNavigation>
      <div className="services-page-container">
        <div className="header">
          <div style={{ backgroundColor: "#79D5A7" }}>
            {srvsIcons.adminServices}
          </div>
          <h2>Admin Service Request</h2>
        </div>

        <div className="services-body-container">
          <div className="services-boxs-container">
            {services.map((service, i) => {
              return (
                <a
                  onClick={() => {
                    service.isLink
                    ? window.open(service.to, "_blank")
                    : navigate(defualt_route + service.to)
                  }}
                  className="box"
                  key={i}
                >
                  <div style={{ backgroundColor: service.bgColor }}>
                    {service.icon}
                  </div>
                  <h3>{service.text}</h3>
                </a>
              );
            })}
          </div>

          <h4 className="services-second-header">Request Center</h4>
          <div className="services-boxs-container">
            <a onClick={() => navigate(`${defualt_route}/admin-services/my-requests`)} className="box">
              <div style={{ backgroundColor: "#FBBE82" }}>
                {srvsIcons.myRequests}
              </div>
              <h3>My Requests</h3>
            </a>
            <a
              onClick={() =>
                navigate(`${defualt_route}/admin-services/assigned-requests`)
              }
              className="box"
            >
              <div style={{ backgroundColor: "#43A2CC" }}>
                {srvsIcons.assignedRequests}
              </div>
              <h3>Assigned Requests</h3>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminServices;



