import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App';
import HistoryNavigation from '../../../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../../../Global/SimpleUserPanel/SimpleUserPanel';
import WorldBG from '../../../../../assets/images/world.svg';



function EmployeeAnalyticsDashboard() {
  const navigate = useNavigate();
  const { user_data, notifications_count, mail_count } = useContext(AppCtx);
  
  
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(-2)}>Power BI Interactive Dashboards</a>
        <a onClick={() => navigate(-1)}>Human Capital</a>
        <p>Employee Analytics Dashboard</p>
      </HistoryNavigation>
      <div className='services-page-container'>
        <img src={WorldBG} className='img-bg' alt="world background" />

        <SimpleUserPanel
          userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          userName={user_data.Data?.DisplayName}
          notificationsCount={notifications_count}
          mailCount={mail_count}
        />

        <div>
          <iframe 
            title="Employee Analytics" 
            width="100%" 
            height="80%" 
            src="https://app.powerbi.com/reportEmbed?reportId=2d0d621d-3dc5-4172-8221-c78800759360&autoAuth=true&ctid=bea1b417-4237-40b8-b020-57fce9abdb43" 
            frameborder="0" 
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </>
  )
}

export default EmployeeAnalyticsDashboard