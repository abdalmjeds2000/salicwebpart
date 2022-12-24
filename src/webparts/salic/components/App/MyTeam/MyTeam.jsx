import React, { useState } from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import TeamTree from './components/TeamTree/TeamTree';
import Information from './components/Information/Information';
import Attendance from './components/Attendance/Attendance';
import KPIProgress from './components/Performance/KPIProgress';
import UserCalendar from './components/Calendar/UserCalendar';
import Leaves from './components/Leaves';
import Tabs from '../Global/CustomTabs/Tabs';
import { Col, Row } from 'antd';
import { AreaChartOutlined, CalendarOutlined, CheckSquareOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';


const MyTeam = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [dataFor, setDataFor] = useState({});
  

  const fetchData = async (user, signal) => {
    axios({
      method: 'GET',
      url: `https://salicapi.com/api/attendance/GetByEmail?Email=-1,${user?.Mail}&startDate=&EndDate=&month=${new Date().getMonth() + 1}&year=${new Date().getYear() + 1900}`,
      signal: signal
    }).then((res) => {
      setAttendanceData(res.data.Data);
    }).catch((err) => {
      console.log(err); 
    });
    

    axios({
      method: 'GET',
      url: `https://salicapi.com/api/Integration/gate_statisiics?PIN=${user?.PIN}`,
      signal: signal
    }).then((res) => {
      setPerformanceData(res.data?.performace?.data);
    }).catch((err) => {
      console.log(err); 
    })
  }

  const onChangeUser = (user, signal) => {
    if(user) {
      fetchData(user, signal);
    }
  }

  const tabsItems = [
    {
      key: 1, 
      icon: <UserOutlined />, 
      title: 'Information', 
      content: <Information userData={dataFor} attendanceData={attendanceData?.slice(0, 7)} />
    },{
      key: 2, 
      icon: <CheckSquareOutlined />, 
      title: 'Attendance', 
      content: <Attendance data={attendanceData} />
    },{
      key: 3, 
      icon: <AreaChartOutlined />, 
      title: 'KPI Progress', 
      content: <KPIProgress data={performanceData} />
    },{
      key: 4, 
      icon: <CalendarOutlined />, 
      title: 'Calendar', 
      content: <UserCalendar userData={dataFor} />
    },/* {
      key: 5, 
      icon: <LogoutOutlined />, 
      title: 'Leaves', 
      content: <Leaves />
    }, */
  ];


  return (
    <>
      <HistoryNavigation>
        <p>My Team</p>
      </HistoryNavigation>

      <div className='standard-page my-team-page'>
        <Row gutter={[12, 12]}>
          <Col span={24}>
            <TeamTree onChangeUser={(user, signal) => {
              onChangeUser(user, signal); 
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