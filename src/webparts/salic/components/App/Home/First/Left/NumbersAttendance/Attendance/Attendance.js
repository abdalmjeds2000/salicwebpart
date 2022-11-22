import React, { useContext, useEffect, useState } from 'react'
import './Attendance.css';
import { useNavigate } from 'react-router-dom';
import { Empty, Spin } from 'antd';
import { AppCtx } from '../../../../../App';
import AntdLoader from '../../../../../Global/AntdLoader/AntdLoader';
import { LoadingOutlined } from '@ant-design/icons';


function Attendance(props) {
  const { defualt_route } = useContext(AppCtx);
  const [isNoData, setIsNoData] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setTimeout(function () {
      if(props.latestAttendance.length === 0) {
        setIsNoData(true);
      }
    }, 5000);
  }, []);


  return (
    <div className="latest-attendance-table-container">
      <table cellSpacing={0} className='latest-attendance-table'>
        <tbody>
          <tr>
            <td colSpan={4}><h2>Latest Attendance</h2></td>
            <td colSpan={1}><a onClick={() => navigate(`${defualt_route}/attendance`)}>See All</a></td>
          </tr>  
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Working Time</th>
          </tr>

          {
            props.latestAttendance.length > 0 
            ? (
              props.latestAttendance?.slice(0, 3).map((day, i) => {
                return (
                day.IsLeave
                ? <tr key={i} /* style={{background: 'linear-gradient(90deg,#e7f0fe,hsla(0,0%,100%,0))'}} */>
                    <td><span>•</span>{day.Day}</td>
                    <td>{day.Date || '-'}</td>
                    <td colSpan={3}>{day.Reason}</td>
                  </tr>
                : <tr key={i} style={{background: `linear-gradient(270deg, transparent 0%, ${day.IsDelayed ? '#fff0dd' : ''} 100%)`}}>
                    <td><span style={{color: day.IsAbsent ? 'rgb(255, 39, 43)' : (day.IsDelayed ? 'rgb(233 155 77)' : 'rgb(39, 124, 98)') }}>•</span>{day.Day}</td>
                    <td>{day.Date || '-'}</td>
                    <td>{day.CheckInTime || '-'}</td>
                    <td>{day.CheckOutTime || '-'}</td>
                    <td>{day.ActualHours || '-'}</td>
                  </tr>
                )
              })
            )
            : !isNoData 
              ? <tr><td colSpan={5} style={{paddingTop: '30px', textAlign: 'center'}}><Spin indicator={<LoadingOutlined spin />} /></td></tr> 
              : <tr><td colSpan={5}><div><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Attendance information is not available." /></div></td></tr>
          }

        </tbody>
      </table>
    </div>
  )
}

export default Attendance