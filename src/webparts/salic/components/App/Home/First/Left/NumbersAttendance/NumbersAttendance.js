import React, { useContext, useEffect, useState } from 'react';
import './NumbersAttendance.css';
import Number from './Number/Number';
import Attendance from './Attendance/Attendance';
import {AppCtx} from '../../../../App';
import GetPerformance from './API/GetPerformance'
import { RadialBar, Column } from '@ant-design/plots';



const performaceGrade = (grade) => {
  if(grade >= 0 && grade <= 75) {
    return {Grade: "Below Expectation", Color: '#EF9494'}
  } else if(grade >= 75.1 && grade <= 89.99) {
    return {Grade: "Partially Meets Expectations", Color: '#FABD81'}
  } else if(grade >= 99 && grade <= 100) {
    return {Grade: "Meets Expectations", Color: '#55ACEE'}
  } else if(grade >= 100.1 ) {
    return {Grade: "Exceeds Expectations", Color: '#277C62'}
  } else {
    return "?"
  }
}

function NumbersAttendance() {
  const { latest_attendance, user_data, performance, setPerformance, all_events } = useContext(AppCtx);
  const [nextEvents, setNextEvents] = useState([]);
  async function fetchData() {
    const response = await GetPerformance(user_data.Data?.PIN);
    if(response.status === 200) {
      setPerformance(response?.data)
    }
    console.log(response)
  }
  useEffect(() => {
    setNextEvents( all_events?.filter(e => new Date(e.Date).toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10)).reverse() )

    if(Object.keys(performance).length === 0 && Object.keys(user_data).length !== 0) {
      fetchData();
    }
  }, [user_data, all_events])




  const configRadialBar = {
    data: [
      { name: "Consumed This Year", value: performance?.leaves?.consumedThisYear, type: "Consumed" },
      { name: "Total Balance", value: performance?.leaves?.total > 15 ? performance?.leaves?.total-(performance?.leaves?.total-15) : performance?.leaves?.total, type: "Available Balance This Year" },
      { name: "Total Balance", value: performance?.leaves?.total > 15 ? performance?.leaves?.total-15 : 0, type: "Expire in This Year" },
    ],
    xField: 'name',
    yField: 'value',
    radius: 1,
    innerRadius: 0.5,
    colorField: 'type',
    color: ({ type }) => {
      if (type === 'Consumed in This Year') {
        return '#F9A654';
      } else if (type === 'Available Balance This Year') {
        return '#E7F0FE';
      } else if (type === 'Expire in This Year') {
        return '#FD96A6';
      }
      return '#43A2CC';
    },
    isStack: true,
    maxAngle: 270,
    animation: {appear: {animation: 'none'}},
  };


  return (
    <div className="numbers-attendance-container">
      <div className="div1">
        <Number
          pathColor={performaceGrade(performance.performace?.count.replace('%', '')).Color} 
          textColor={performaceGrade(performance.performace?.count.replace('%', '')).Color}
          header="KPI Progress" 
          description={'%' /* performaceGrade(performance.performace?.count.replace('%', '')).Grade */}
          value={Object.keys(performance).length !== 0 ? performance.performace?.count.replace('%', '') : '0'}
          text={Object.keys(performance).length !== 0 ? performance.performace?.count.replace('%', '') : '?'}
          minValue='0'
          maxValue='100'
          numberType="performance"
          dataTable={performance?.performace?.data}
        />
      </div>
      <div className="div2">
        {/* <Number 
          pathColor='#277C62' 
          header="Leaves Balance" 
          description={`${(isNaN(performance?.leaves - 15)) || (performance?.leaves - 15 < 0) ? '0' : performance?.leaves - 15 } expire at 1/1/${new Date().getYear() + 1901}`}
          value={performance?.leaves ? performance?.leaves : '0'}
          minValue='0'
          maxValue='30'
          text={performance?.leaves ? `${performance?.leaves}` : '?'}
          textColor='#277C62' 
        /> */}
      </div>
      <div className="div3">
        <Number
          pathColor='var(--main-color)' 
          header="Next Event" 
          description={nextEvents.length > 0 ? nextEvents[0]?.Subject : 'None'} 
          value={`${Math.floor((new Date(nextEvents[0]?.Date).getTime() - new Date().getTime())  / (1000 * 3600 * 24))}`}
          minValue='0'
          maxValue={`${Math.floor((new Date(nextEvents[0]?.Date).getTime() - new Date(nextEvents[0]?.Created).getTime())  / (1000 * 3600 * 24))}`}
          text={`${Math.floor((new Date(nextEvents[0]?.Date).getTime() - new Date().getTime())  / (1000 * 3600 * 24))}`}
          textColor='var(--main-color)'
        />
      </div>
      <div className="div4">
        {/* <Number 
          pathColor='#ff272b' 
          header="Employment Period" 
          description="5 Days" 
          value='5'
          minValue='0'
          maxValue='24'
          text='5'
          textColor='#ff272b'
        /> */}
        {
          (Object.keys(performance).length !== 0) && (performance?.leaves?.consumedThisYear + performance?.leaves?.total !== 0) 
          ? <RadialBar 
              {...configRadialBar}
              style={{
                width: '100%',
                margin: '20px 0 40px 0',
              }} 
            />
          : null
        }
      </div>
      <div className="div5">
        <Attendance latestAttendance={latest_attendance} />
      </div>  
    </div>
  )
}

export default NumbersAttendance