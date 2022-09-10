import React, { useContext, useEffect, useState } from 'react';
import './NumbersAttendance.css';
import Number from './Number/Number';
import Attendance from './Attendance/Attendance';
import {AppCtx} from '../../../../App';
import { Empty } from 'antd';


function NumbersAttendance() {
  const { latest_attendance } = useContext(AppCtx);
  const [isNoData, setIsNoData] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      if(latest_attendance.length === 0) {
        setIsNoData(true);
      }
    }, 8000);
  }, []);

  return (
    <div className="numbers-attendance-container">
      <div className="div1">
        <Number 
          pathColor='#277C62' 
          header="Performance" 
          description="Good" 
          value='100'
          minValue='0'
          maxValue='100'
          text='100%'
          textColor='#277C62'
        />
      </div>
      {/* <div className="div2">
        <Number 
          pathColor='#ff272b' 
          header="Employment Period" 
          description="5 Days" 
          value='5'
          minValue='0'
          maxValue='24'
          text='5'
          textColor='#ff272b'
        />
      </div> */}
      <div className="div2">
        <Number 
          pathColor='#277C62' 
          header="Annual Leaves" 
          description="20 / 30 Days" 
          value='20'
          minValue='0'
          maxValue='30'
          text='20'
          textColor='#277C62' 
        />
      </div>
      <div className="div3">
        <Number 
          pathColor='var(--main-color)' 
          header="Next Event" 
          description="National day" 
          value='55'
          minValue='0'
          maxValue='70'
          text='55'
          textColor='var(--main-color)'
        />
      </div>
      <div className="div5">
        {
          latest_attendance.length > 0 
          ? <Attendance latestAttendance={latest_attendance} />
          : !isNoData ? <div className="loader small"><div></div></div> : <div><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Attendance information is not available." /></div>
        }
      </div>  
    </div>
  )
}

export default NumbersAttendance