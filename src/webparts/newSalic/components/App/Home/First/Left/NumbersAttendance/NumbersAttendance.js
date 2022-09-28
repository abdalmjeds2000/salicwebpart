import React, { useContext, useEffect, useState } from 'react';
import './NumbersAttendance.css';
import Number from './Number/Number';
import Attendance from './Attendance/Attendance';
import {AppCtx} from '../../../../App';
import GetPerformance from './API/GetPerformance'

const performaceGrade = (grade) => {
  if(grade >= 0 && grade <= 75) {
    return "Below Expectation"
  } else if(grade >= 75.1 && grade <= 89.99) {
    return "Partially Meets Expectations"
  } else if(grade >= 99 && grade <= 100) {
    return "Meets Expectations"
  } else if(grade >= 100.1 ) {
    return "Exceeds Expectations"
  } else {
    return "?"
  }
}

function NumbersAttendance() {
  const { latest_attendance, user_data, performance, setPerformance } = useContext(AppCtx);

  async function fetchData() {
    const response = await GetPerformance(user_data.Data?.PIN);
    if(response.status === 200) {
      setPerformance(response?.data)
    }
    console.log(response)
  }
  useEffect(() => {
    if(Object.keys(performance).length === 0 && Object.keys(user_data).length !== 0) {
      fetchData();
    }
  }, [user_data])



  return (
    <div className="numbers-attendance-container">
      <div className="div1">
        <Number
          pathColor='#277C62' 
          header="% Performance" 
          description={performaceGrade(performance.performace?.count.replace('%', ''))}
          value={Object.keys(performance).length !== 0 ? performance.performace?.count.replace('%', '') : '0'}
          minValue='0'
          maxValue='100'
          text={Object.keys(performance).length !== 0 ? performance.performace?.count.replace('%', '') : '?'}
          textColor='#277C62'
          numberType="performance"
          dataTable={performance?.performace?.data}
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
          header="Leaves Balance" 
          description="" 
          value={performance?.leaves ? performance?.leaves : '0'}
          minValue='0'
          maxValue='30'
          text={performance?.leaves ? `${performance?.leaves}` : '?'}
          textColor='#277C62' 
        />
      </div>
      <div className="div3">
        <Number 
          pathColor='var(--main-color)' 
          header="Next Event" 
          description={performance?.holiday === null ? 'None' : 'None'} 
          value={performance?.holiday === null ? '0' : '0'}
          minValue='0'
          maxValue='70'
          text={performance?.holiday === null ? '?' : '?'}
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