import React, { useState } from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import TeamTree from './components/TeamTree/TeamTree';
import Information from './components/Information/Information';
import Attendance from './components/Attendance/Attendance';
import Performance from './components/Performance';
import GoogolCalendar from './components/GoogolCalendar';
import Leaves from './components/Leaves';
import Tabs from '../Global/CustomTabs/Tabs';
import { Col, Row } from 'antd';
import { AreaChartOutlined, CalendarOutlined, CheckSquareOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';


const MyTeam = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [dataFor, setDataFor] = useState({});
  
  const onChangeUser = (user) => {
    if(user) {
      axios({
        method: 'GET',
        url: `https://salicapi.com/api/attendance/GetByEmail?Email=-1,${user?.Mail}&startDate=&EndDate=&month=${new Date().getMonth() + 1}&year=${new Date().getYear() + 1900}`
      }).then((res) => {
        setAttendanceData(res.data.Data);
      }).catch((err) => {
        console.log(err); 
      });
      
  
      axios({
        method: 'GET',
        url: `https://salicapi.com/api/Integration/gate_statisiics?PIN=${user?.PIN}`
      }).then((res) => {
        setPerformanceData(res.data?.performace?.data);
      }).catch((err) => {
        console.log(err); 
      })
    }
  }

  const tabsItems = [
    {
      key: 1, 
      icon: <UserOutlined />, 
      title: 'Information', 
      content: <Information data={dataFor} />
    },{
      key: 2, 
      icon: <CheckSquareOutlined />, 
      title: 'Attendance', 
      content: <Attendance data={attendanceData} />
    },{
      key: 3, 
      icon: <AreaChartOutlined />, 
      title: 'Performance', 
      content: <Performance data={performanceData} />
    },{
      key: 4, 
      icon: <CalendarOutlined />, 
      title: 'Calendar', 
      content: <GoogolCalendar />
    },{
      key: 5, 
      icon: <LogoutOutlined />, 
      title: 'Leaves', 
      content: <Leaves />
    },
  ];


  return (
    <>
      <HistoryNavigation>
        <p>My Team</p>
      </HistoryNavigation>

      <div className='standard-page my-team-page'>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <TeamTree onChangeUser={(user) => {
              onChangeUser(user); 
              setDataFor(user);
            }} />
          </Col>

          <Col span={24}>
            <Tabs items={tabsItems} />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default MyTeam