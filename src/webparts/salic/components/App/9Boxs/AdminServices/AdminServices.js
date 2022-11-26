import React from "react";
import HistoryNavigation from "../../Global/HistoryNavigation/HistoryNavigation";
import { services, srvsIcons } from './boxsData';
import ServicesSection from "../../Global/ServicesSection/ServicesSection";


const AdminServices = () => {

  return (
    <>
      <HistoryNavigation>
        <p>Admin Services Center</p>
      </HistoryNavigation>

      <div className="standard-page">
        <ServicesSection
          title="Admin Service Request"
          headerIcon={<div style={{ backgroundColor: "#79D5A7" }}>{srvsIcons.adminServices}</div>}
          items={services}
        />
      </div>
    </>
  );
};

export default AdminServices;



