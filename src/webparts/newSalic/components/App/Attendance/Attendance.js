import React, { useContext, useState } from 'react'
import './Attendance.css';
import HeaderIcon from '../../../assets/icons/attendance-page/HeaderIcon.svg';
import WorldBG from '../../../assets/images/world.svg';

import Statistics from './Statistics/Statistics'
import DailyAttendance from './DailyAttendance/DailyAttendance'
import SimpleUserPanel from '../Global/SimpleUserPanel/SimpleUserPanel';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../App'


function Attendance() {
  const { user_data, notifications_count, mail_count, departments_info } = useContext(AppCtx);

  const subMenuItems = [
    { id: 1, text: "Statistics" },
    { id: 2, text: "Daily Attendance" },
    // { id: 3, text: "Late Justification Approval" },
    // { id: 4, text: "Late Justification Approval HR" }
  ];
  const [activeId, setActiveId] = useState(1);



  return (
    <>
      <HistoryNavigation>
        <p>Attendance</p>
      </HistoryNavigation>
      <div className='attendance-page-container'>
        <img src={WorldBG} className='bg-img-world' alt='worldIllustration' />
        <SimpleUserPanel
            userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
            userName={user_data.Data?.DisplayName}
            notificationsCount={notifications_count}
            mailCount={mail_count}
          />
        <div className="header">
          <img src={HeaderIcon} alt="Header Icon" />
          <h2>Attendance</h2>
        </div>
        <div>
          <div className="buttons">
            <ul>
              {subMenuItems.map((val, i) => (
                <li key={i} onClick={() => {setActiveId(val.id); }} className={activeId === val.id ? "active" : ""}>
                  {val.text}
                </li>
              ))}
            </ul>
          </div>
          <div className='attendance-sections-container'>
            <div style={{display: activeId !== 1 ? 'none' : ''}}>
              <Statistics />
            </div>
            <div style={{display: activeId !== 2 ? 'none' : ''}}>
              {
                departments_info.length > 0
                ? <DailyAttendance />
                : <div className='daily-attendance-container' style={{height: '200px'}}>
                    <div className='loader' style={{position: 'relative'}}><div></div></div>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Attendance