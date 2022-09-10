import React, { useState } from 'react'
import './Attendance.css';
import HeaderIcon from '../../../assets/icons/attendance-page/HeaderIcon.svg';
import WorldBG from '../../../assets/images/world.svg';

import Statistics from './Statistics/Statistics'
import DailyAttendance from './DailyAttendance/DailyAttendance'

function Attendance() {

  const subMenuItems = [
    { id: 1, text: "Statistics" },
    { id: 2, text: "Daily Attendance" },
    { id: 3, text: "Late Justification Approval" },
    { id: 4, text: "Late Justification Approval HR" }
  ];
  const [activeId, setActiveId] = useState(1);



  return (
    <div className='attendance-page-container'>
      <img src={WorldBG} className='bg-img-world' alt='worldIllustration' />
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
            <DailyAttendance />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance