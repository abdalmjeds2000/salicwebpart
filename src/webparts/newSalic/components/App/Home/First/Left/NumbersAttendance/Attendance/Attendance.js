import React, { useContext, useEffect, useState } from 'react'
import './Attendance.css';
import { NavLink } from 'react-router-dom';
import { Empty } from 'antd';
import { AppCtx } from '../../../../../App';


function Attendance(props) {
  const { defualt_route } = useContext(AppCtx);

  return (
    <div className="latest-attendance-table-container">
      <table cellSpacing={0} className='latest-attendance-table'>
        <tbody>
          <tr>
            <td colSpan={4}><h2>Latest Attendance</h2></td>
            <td colSpan={1}><NavLink to={`${defualt_route}/attendance`}>See All</NavLink></td>
          </tr>  
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Working Time</th>
          </tr>

        {
          props.latest_attendance?.length > 0 
          ? props.latestAttendance?.slice(0, 3).map((day, i) => {
              return <tr key={i} style={{background: `linear-gradient(270deg, transparent 0%, ${day.IsDelayed ? '#fff0dd' : ''} 100%)`}}>
                <td><span style={{color: day.IsAbsent ? 'rgb(255, 39, 43)' : (day.IsDelayed ? 'rgb(233 155 77)' : 'rgb(39, 124, 98)') }}>•</span>{day.Day}</td>
                <td>{day.Date || '-'}</td>
                <td>{day.CheckInTime || '-'}</td>
                <td>{day.CheckOutTime || '-'}</td>
                <td>{day.ActualHours || '-'}</td>
              </tr>
            })
          : props.children
        }


        </tbody>
      </table>
    </div>
  )
}

export default Attendance