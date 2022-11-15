import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';



function HRDashboard() {
  const navigate = useNavigate();
  const { defualt_route } = useContext(AppCtx);
  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/power-bi-dashboards`)}>Power BI Interactive Dashboards</a>
        <a onClick={() => navigate(`${defualt_route}/power-bi-dashboards/human-capital`)}>Human Capital</a>
        <p>HR Dashboard</p>
      </HistoryNavigation>

      
      <div className='folder-explorer-container'>

        <div className='power-bi-iframe-container'>
          <iframe 
            title="HR Dashboard" 
            width="100%" 
            height="80%" 
            src="https://app.powerbi.com/reportEmbed?reportId=98ef1b34-ea61-46e4-9409-8384c406ca7e&autoAuth=true&ctid=bea1b417-4237-40b8-b020-57fce9abdb43" 
            frameborder="0" 
            allowFullScreen="true"
          ></iframe>
        </div>

      </div>
    </>
  )
}

export default HRDashboard