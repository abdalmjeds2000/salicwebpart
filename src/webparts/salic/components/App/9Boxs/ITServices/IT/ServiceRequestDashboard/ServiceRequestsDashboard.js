import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceRequestsDashboard.css';
import { DownOutlined, HomeOutlined, LoadingOutlined, TableOutlined, UserSwitchOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../../../../App';
import { Image, Spin, Tree, Typography } from 'antd';
import Dashboard from './components/Dashboard/Dashboard';
import ServicesRequests from './components/ServicesRequests/ServicesRequests';
import GetSummaryByStatus from '../../API/GetSummaryByStatus';
import GetSummaryByPriority from '../../API/GetSummaryByPriority';
import GetSummaryByDepartment from '../../API/GetSummaryByDepartment';
import GetSummaryByRequestType from '../../API/GetSummaryByRequestType';
import GetITRequests from '../../API/GetITRequests';
import AntdLoader from '../../../../Global/AntdLoader/AntdLoader';
import Tabs from '../../../../Global/CustomTabs/Tabs';


function ServiceRequestsDashboard() {
  const { 
    user_data, 
    defualt_route, 
    summaryByStatus, setSummaryByStatus, 
    summaryByPriority, setSummaryByPriority, 
    summaryByDepartment, setSummaryByDepartment,
    summaryByRequestType, setSummaryByRequestType,
    ITRequests, setITRequests
  } = useContext(AppCtx);
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [dataForUser, setDataForUser] = useState(null);


  useEffect(() => {
    setDataForUser(_ => {return {DisplayName: user_data?.Data?.DisplayName, Mail: user_data?.Data?.Mail}})
  }, [user_data])

  const FetchData = async () => {
    setPageLoading(true);
    const _email = dataForUser.Mail || user_data.Data?.Mail;
    const _byStatus = await GetSummaryByStatus(_email);
    const _byPriority = await GetSummaryByPriority(_email);
    const _byDepartment = await GetSummaryByDepartment(_email);
    const _byRequestType = await GetSummaryByRequestType(_email);
    const _itRequests = await GetITRequests(_email);
    setSummaryByStatus(_byStatus.data.Data);
    setSummaryByPriority(_byPriority.data.Data);
    setSummaryByDepartment(_byDepartment.data.Data);
    setSummaryByRequestType(_byRequestType.data.Data);
    setITRequests(_itRequests.data.data);
    setPageLoading(false);
  }

  useEffect(() => {
    if( 
      Object.keys(user_data).length > 0 && 
      Object.keys(summaryByStatus).length === 0 && 
      Object.keys(summaryByPriority).length === 0 && 
      Object.keys(summaryByDepartment).length === 0 && 
      Object.keys(summaryByRequestType).length === 0 && 
      Object.keys(ITRequests).length === 0 && 
      dataForUser 
    ) {
      FetchData()
    }
  }, [user_data])
  useEffect(() => {
    if( Object.keys(user_data).length > 0 && dataForUser ) {
      FetchData()
    }
  }, [user_data, dataForUser])

  const onSelect = (selectedKeys, info) => {
    setDataForUser(_ => {
      if(info.selectedNodes.length > 0) {
        return {...info.selectedNodes[0]}
      }
      return { ...{DisplayName: user_data?.Data?.DisplayName, Mail: user_data?.Data?.Mail}}
    })
  };



  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/services-requests`)}>IT Service Center</a>
        <p>Service Requests Dashboard</p>
      </HistoryNavigation>


      <div className='standard-page service-requests-dashboard-container'>
        {user_data.Data?.DirectUsers?.length > 0 && <div className='employees-tree'>
          <Typography.Text strong style={{display: 'block', fontSize: '1rem', marginBottom: '10px'}}>
            <UserSwitchOutlined /> Select Employee
          </Typography.Text>
          <Tree
            showLine
            showIcon
            defaultExpandedKeys={[user_data?.Data?.DirectUsers[0]?.Mail]}
            switcherIcon={<DownOutlined />}
            onSelect={onSelect}
            treeData={[user_data.Data]}
            fieldNames={{ title: "DisplayName", key: "Mail", children: "DirectUsers"  }}
          />
        </div>}
        <Tabs 
          loading={pageLoading}
          items={[
            {key: 1, icon: <HomeOutlined />, title: 'Dashboard', content: <Dashboard DataForUser={dataForUser} summaryByStatus={summaryByStatus} summaryByPriority={summaryByPriority} summaryByDepartment={summaryByDepartment} summaryByRequestType={summaryByRequestType} />},
            {key: 2, icon: <TableOutlined />, title: 'Service Requests', content: <ServicesRequests DataTable={ITRequests} setITRequestsNoFilter={data => setITRequests(data)} />},
          ]}
        />
      </div>
    </>
  )
}

export default ServiceRequestsDashboard