import React, { useContext } from 'react';
import './PowerBIInteractiveDashboards.css';
import { AppCtx } from '../App';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate } from 'react-router-dom';
import { icons } from './boxesData';


function PowerBIInteractiveDashboards() {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  const services = [
    {icon: icons.CreateInvoiceRequest, bgColor: 'rgb(39, 124, 98)', text: 'Human Capital', to: `${defualt_route}/power-bi-dashboards/human-capital`},
    {icon: icons.ReceiveOrderItems, bgColor: 'rgb(233, 155, 77)', text: 'Research', to: `${defualt_route}/power-bi-dashboards/research`},
  ];
  
  return (
    <>
      <HistoryNavigation>
        <p>Power BI Interactive Dashboards</p>
      </HistoryNavigation>
      <div className='services-page-container'>

        <div className="header">
          <h2>Interactive Dashboards</h2>
        </div>
        <div className='services-body-container'>
          <div className="services-boxs-container">
            {services.map((service, i) => {
              return ( 
                <a 
                  key={i}
                  className='box' 
                  onClick={() => navigate(service.to)}
                >
                  <div style={{backgroundColor: service.bgColor}}>
                    {service.icon}
                  </div>
                  <h3>{service.text}</h3>
                </a>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default PowerBIInteractiveDashboards