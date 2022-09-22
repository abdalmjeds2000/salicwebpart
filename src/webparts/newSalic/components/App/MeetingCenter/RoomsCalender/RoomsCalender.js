import React, { useContext, useState } from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation'
import SimpleUserPanel from '../../Global/SimpleUserPanel/SimpleUserPanel'
import { useNavigate } from 'react-router-dom';
import WorldBG from '../../../../assets/images/world.svg';
import { AppCtx } from '../../App';



function RoomsCalender() {
  const { user_data, notifications_count, mail_count, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/book-meeting-room`)}>Meetings Center</a>
        <p>Reserve Meeting Room</p>
      </HistoryNavigation>
      <div className='meetings-center-container'>
        <img src={WorldBG} className='img-bg' alt="world background" />

        <SimpleUserPanel
          userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          userName={user_data.Data?.DisplayName}
          notificationsCount={notifications_count}
          mailCount={mail_count}
        />

        <div className='content'>
          <div className="header">
            <h1>My Meetings</h1>
          </div>

          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default RoomsCalender