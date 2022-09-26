import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';



function DailyDashboard() {
  const navigate = useNavigate();
  const { defualt_route } = useContext(AppCtx);
  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/power-bi-dashboards`)}>Power BI Interactive Dashboards</a>
        <a onClick={() => navigate(`${defualt_route}/power-bi-dashboards/research`)}>Research</a>
        <p>Daily Dashboard</p>
      </HistoryNavigation>
      
      <div className='services-page-container'>

        <div>
          <iframe 
            title="Daily Dashboard" 
            width="100%" 
            height="80%" 
            src="https://app.powerbi.com/reportEmbed?reportId=13877c4a-339a-46ba-90b6-429cf193f74a&autoAuth=true&ctid=bea1b417-4237-40b8-b020-57fce9abdb43&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLWQtcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" 
            frameborder="0" 
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </>
  )
}

export default DailyDashboard