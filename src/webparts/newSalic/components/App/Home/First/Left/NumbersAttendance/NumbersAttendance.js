import React, { useContext, useEffect, useState } from 'react';
import './NumbersAttendance.css';
import Number from './Number/Number';
import Attendance from './Attendance/Attendance';
import {AppCtx} from '../../../../App';
import GetPerformance from './API/GetPerformance'

function NumbersAttendance() {
  const { latest_attendance, user_data } = useContext(AppCtx);

  const [performance, setPerformance] = useState({});

  async function fetchData() {
    const response = await GetPerformance(user_data.Data?.PIN);
    
      console.log(response)
    
  }

  useEffect(() => {
    fetchData();
  }, [])
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
        <Attendance latestAttendance={latest_attendance} />
      </div>  
    </div>
  )
}

export default NumbersAttendance