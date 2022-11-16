import React, { useContext, useEffect, useState } from 'react';
import './NumbersAttendance.css';
import Number from './Number/Number';
import Attendance from './Attendance/Attendance';
import {AppCtx} from '../../../../App';
import GetPerformance from './API/GetPerformance'
import { RadialBar } from '@ant-design/plots';
import moment from 'moment';
import { Tooltip } from 'antd';


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
  const { latest_attendance, user_data, performance, all_events } = useContext(AppCtx);
  const [nextEvents, setNextEvents] = useState([]);
  
  // async function fetchData() {
  //   const response = await GetPerformance(user_data.Data?.PIN);
  //   if(response.status === 200) {
  //     setPerformance(response?.data)
  //   }
  // }
  useEffect(() => {
    setNextEvents( all_events?.filter(e => new Date(e.Date).toJSON().slice(0, 10) > new Date().toJSON().slice(0, 10)).reverse() )

    // if(Object.keys(performance).length === 0 && Object.keys(user_data).length !== 0) {
    //   fetchData();
    // }
  }, [user_data, all_events])


  const totalBalance = ((12-(new Date().getMonth()+1))*2.5)+performance?.leaves?.total;

  const configRadialBar = {
    data: [
      { name: "Consumed This Year", value: performance?.leaves?.consumedThisYear, type: "Consumed" },
      // { name: "Total Balance", value: performance?.leaves?.total > 15 ? performance?.leaves?.total-(performance?.leaves?.total-15) : performance?.leaves?.total, type: "Available Balance This Year" },
      // { name: "Total Balance", value: performance?.leaves?.total > 15 ? performance?.leaves?.total-15 : 0, type: "Expire in This Year" },
      { name: "Leave Balance", value: totalBalance, type: `Total balance till end of the year.` },
    ],
    xField: 'name',
    yField: 'value',
    radius: 1,
    innerRadius: 0.5,
    colorField: 'name',
    tooltip: {
      formatter: (label) => {
        if(label.name === "Leave Balance") {
          return { name: `Total balance is ${totalBalance} days till end of the year, ${totalBalance-15} days of them must consumed this year`, value: `` };
        }
        return label
      },
    },
    color: ({ name }) => {
      if (name === 'Consumed This Year') {
        return '#F9A654'; 
      } else if (name === 'Available Balance This Year') {
        return '#E7F0FE';
      } else if (name === 'Leave Balance') {
        return '#43A2CC';
      }
      return '#FD96A6';
    },
    isStack: true,
    maxAngle: 270,
    animation: {appear: {animation: 'none'}},
    onReady: (plot) => {
      // Axis-label adds click events
      // plot.on('axis-label:click', (...args) => {
      //   const ClickedName = args[0].gEvent.target.attrs.text;
      //   if(ClickedName === "Total Balance") {
      //     window.open("https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=ABSENCE_BALANCE&action=NONE", "_blank");
      //   } else if(ClickedName === "Consumed This Year") {
      //     window.open("https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=EXISTING_ABSENCES&action=NONE", "_blank");
      //   }
      // })
    },
  };

  const PerformanceColumns = [
    { title: 'KPI', dataIndex: 'KPI_NAME', width: '15%' },
    { title: 'Objectives', dataIndex: 'OBJECTIVES', width: '15%' },
    { title: '%', dataIndex: 'MEASURE_ACHIEVE', width: '10%', render: (val) => val ? `${val}%` : ' - ' },
    { title: 'Target', dataIndex: 'TARGET', width: '10%' },
    { title: 'UOM', dataIndex: 'UOM', width: '10%', render: (val) => val !== '%' && val !== '#' ? val : ' - ' },
    { title: 'Weightage', dataIndex: 'WEIGHTAGE', width: '5%'},
    { title: 'Manager KPI', dataIndex: 'Manager_KPI', width: '5%', render: (val) => val ? val : '-' },
    { title: 'Start Day', dataIndex: 'START_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' },
    { title: 'End Day', dataIndex: 'END_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' },
    { title: 'Achieve Date', dataIndex: 'ACHIEVE_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' }
  ];
  const EventsColumns = [
    { title: 'Event', dataIndex: 'Subject', width: '40%' },
    { title: 'Date', dataIndex: 'Date', width: '40%', render: (val) => moment(val).format('MM/DD/YYYY') },
    { title: 'Remaining', dataIndex: '', width: '20%', render: (_, record) => `${Math.floor((new Date(record.Date).getTime() - new Date().getTime())  / (1000 * 3600 * 24))} Days Left` },
  ];


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
          PerformanceDataTable={performance?.performace?.data}
          PerformanceColumns={PerformanceColumns}
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
          numberType="events"
          EventsDataTable={nextEvents}
          EventsColumns={EventsColumns}
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
          ? <>
              {/* <a className='mid-total' href='https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=ABSENCE_BALANCE&action=NONE' target='_blank'>{((12-(new Date().getMonth()+1))*2.5)+performance?.leaves?.total}</a> */}
              <Tooltip placement="top" title="Current Balance">
                <a className='mid-total' href='https://hen.fa.em2.oraclecloud.com/fscmUI/faces/deeplink?objType=ABSENCE_BALANCE&action=NONE' target='_blank'>{performance?.leaves?.total}</a>
              </Tooltip>
              <RadialBar 
                {...configRadialBar}
                style={{
                  width: '100%',
                  margin: '20px 0 40px 0',
                }} 
                
              />
            </>
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