import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../../Global/SimpleUserPanel/SimpleUserPanel';
import WorldBG from '../../../../assets/images/world.svg';

function HumanCapital() {
  const navigate = useNavigate();
  const { user_data, notifications_count, mail_count, defualt_route } = useContext(AppCtx);

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/power-bi-dashboards`)}>Power BI Interactive Dashboards</a>
        <p>Human Capital</p>
      </HistoryNavigation>
      <div className='services-page-container'>
        <img src={WorldBG} className='img-bg' alt="world background" />

        <SimpleUserPanel
          userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          userName={user_data.Data?.DisplayName}
          notificationsCount={notifications_count}
          mailCount={mail_count}
        />

        <div className="header">
          <h2>Interactive Dashboards</h2>
        </div>
        <div className='services-body-container'>
          <div className="services-boxs-container">
            
          </div>
        </div>
      </div>
    </>
  )
}

export default HumanCapital