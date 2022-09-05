import React, { useContext } from 'react'
import './NineBoxs.css';
import { NavLink } from "react-router-dom";

import AdminServices from '../../../../../../assets/icons/nine_boxs_icons/Admin Services.svg';
import ITServices from '../../../../../../assets/icons/nine_boxs_icons/IT Services.svg';
import EInvoicing from '../../../../../../assets/icons/nine_boxs_icons/e-invoicing.svg';
import OracleReports from '../../../../../../assets/icons/nine_boxs_icons/Oracle Reports.svg';
import HRSelfServices from '../../../../../../assets/icons/nine_boxs_icons/HR Self Services.svg';
import IncidentsCenter from '../../../../../../assets/icons/nine_boxs_icons/Incidents Center.svg';
import CorrespondingSystem from '../../../../../../assets/icons/nine_boxs_icons/Corresponding System.svg';
import ResearchCenter from '../../../../../../assets/icons/nine_boxs_icons/Research Center.svg';
import ESignatureTool from '../../../../../../assets/icons/nine_boxs_icons/E Signature Tool.svg';
import Performance from '../../../../../../assets/icons/nine_boxs_icons/performance.svg';
import DMS from '../../../../../../assets/icons/nine_boxs_icons/DMS.svg';
import { AppCtx } from '../../../../App';



const services = [
  {icon: AdminServices, header: 'Admin Services', to: '/admin-services'},
  {icon: ITServices, header: 'IT Services', to: '/it-services'},
  {icon: EInvoicing, header: 'e-Invoicing', to: '/e-invoicing'},
  {icon: HRSelfServices, header: 'HR Self Services', to: '/hr-self-services'},
  {icon: IncidentsCenter, header: 'Incidents Center', to: '/incidents-center'},
  {icon: CorrespondingSystem, header: 'Corresponding System', to: '/corresponding-system'},
  {icon: ResearchCenter, header: 'Research Center', to: '/research-center'},
  {icon: Performance, header: 'Performance Managment', to: '/performance-managment'},
  {icon: DMS, header: 'DMS', to: '/dms'},
];


function NineBoxs() {
  const { defualt_route } = useContext(AppCtx);
  

  return (
    <div className="services-container">
      {services.map((service, i) => {
        return <NavLink to={defualt_route + service.to} key={i}>
          <div className="service-box">
            <div>
              <img src={service.icon} alt='' />
            </div>
            <h3>{service.header}</h3>
          </div>
        </NavLink>
      })}
    </div>
  )
}

export default NineBoxs