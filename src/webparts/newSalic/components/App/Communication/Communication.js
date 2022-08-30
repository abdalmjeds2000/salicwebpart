import React, { useContext } from 'react';
import './Communication.css';
import { AppCtx } from '../App';
import OrgChart from './mytree';
import WorldBG from '../../../assets/images/world.svg';
import SimpleUserPanel from '../Global/SimpleUserPanel/SimpleUserPanel';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';







function Communication() {
  const { communicationList, user_data, notifications_count, mail_count } = useContext(AppCtx);


  return (
    <div style={{position: 'relative', top: '85px', minHeight: 'calc(100vh - 85px)'}}>
      <HistoryNavigation>
        <p>Communication</p>
      </HistoryNavigation>
      <SimpleUserPanel
        userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
        userName={user_data.Data?.DisplayName}
        notificationsCount={notifications_count}
        mailCount={mail_count}
      />
      <img src={WorldBG} className='img-bg' alt="world background" />
      {
        communicationList.length > 0 
        ? <OrgChart nodes={communicationList} />
        : <div className="loader"><div></div></div>
      }
      
  </div>
  )
}

export default Communication