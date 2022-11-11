import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceRequestsDashboard.css';
import { DownOutlined, HomeOutlined, LoadingOutlined, TableOutlined } from '@ant-design/icons';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../../../../App';
import { Spin, Tree, Typography } from 'antd';
import Dashboard from './components/Dashboard/Dashboard';
import ServicesRequests from './components/ServicesRequests/ServicesRequests';
import GetSummaryByStatus from '../../API/GetSummaryByStatus';
import GetSummaryByPriority from '../../API/GetSummaryByPriority';
import GetSummaryByDepartment from '../../API/GetSummaryByDepartment';
import GetSummaryByRequestType from '../../API/GetSummaryByRequestType';
import GetITRequests from '../../API/GetITRequests';


const treeData = [
  {
    title: "Akmal Eldahdouh",
    key: "Akmal.Eldahdouh@salic.com",
    children: [
      {
        title: "Abdullah Alsuheem",
        key: "Abdullah.Alsuheem@salic.com",
        children: [],
      },{
        title: "Abdulmohsen Alaiban",
        key: "abdulmohsen.alaiban@salic.com",
        children: [],
      }
    ],
  },
];



function ServiceRequestsDashboard() {
  const { user_data, defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const [summaryByStatus, setSummaryByStatus] = useState([]);
  const [summaryByPriority, setSummaryByPriority] = useState([]);
  const [summaryByDepartment, setSummaryByDepartment] = useState([]);
  const [summaryByRequestType, setSummaryByRequestType] = useState([]);
  const [ITRequests, setITRequests] = useState([]);
  const [dataForUser, setDataForUser] = useState(null);


  useEffect(() => {
    setDataForUser({title: user_data?.Data?.DisplayName, key: user_data?.Data?.Mail})
  }, [user_data])

  const FetchData = async () => {
    setPageLoading(true);
    const _email = dataForUser.key || user_data.Data?.Mail;
    const _byStatus = await GetSummaryByStatus(_email);
    const _byPriority = await GetSummaryByPriority(_email);
    const _byDepartment = await GetSummaryByDepartment(_email);
    const _byRequestType = await GetSummaryByRequestType(_email);
    const _itRequests = await GetITRequests();
    setSummaryByStatus(_byStatus.data.Data);
    setSummaryByPriority(_byPriority.data.Data);
    setSummaryByDepartment(_byDepartment.data.Data);
    setSummaryByRequestType(_byRequestType.data.Data);
    setITRequests(_itRequests.data.data);
    setPageLoading(false);
  }

  useEffect(() => {
    if( Object.keys(user_data).length > 0 && dataForUser ) {
      FetchData()
    }
  }, [user_data, dataForUser])

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setDataForUser(_ => {
      if(info.selectedNodes.length > 0) {
        return {...info.selectedNodes[0]}
      }
      return {title: user_data?.Data?.DisplayName, key: user_data?.Data?.Mail}
    })
  };


  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/it-services`)}>IT Service Center</a>
        <p>Service Requests Dashboard</p>
      </HistoryNavigation>


      <div className='service-requests-dashboard-container'>
        <div className='employees-tree'>
          <Typography.Text strong style={{marginBottom: '20px'}}>Select Employee</Typography.Text>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </div>

        <div className='tabbable-panel'>
          <ul className="tab-container">
            <li onClick={() => setActiveTab(1)} className={activeTab==1 ? 'active' : ''}>
              <HomeOutlined /> Dashboard
            </li>
            <li onClick={() => setActiveTab(2)} className={activeTab==2 ? 'active' : ''}>
              <TableOutlined /> Service Requests
            </li>
          </ul>


          <div className='tab-content'>
            {
              !pageLoading
              ? (
                  activeTab == 1
                  ? <Dashboard
                      DataForUser={dataForUser}
                      summaryByStatus={summaryByStatus}
                      summaryByPriority={summaryByPriority}
                      summaryByDepartment={summaryByDepartment}
                      summaryByRequestType={summaryByRequestType}
                    />
                  : activeTab == 2
                  ? <ServicesRequests DataTable={ITRequests} />
                  : null
                )
              : <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
            }
          </div>

        </div>
      </div>
    </>
  )
}

export default ServiceRequestsDashboard