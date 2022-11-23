import React, { useContext, useState } from 'react';
import { DatabaseOutlined, HomeOutlined, TableOutlined } from '@ant-design/icons';
import Tabs from '../../../../Global/CustomTabs/Tabs';
import HistoryNavigation from '../../../../Global/HistoryNavigation/HistoryNavigation';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../App';
import Dashboard from './components/Dashboard';




const AllAssets = () => {
  const [loading, setLoading] = useState(true);
  const { user_data, defualt_route, } = useContext(AppCtx);
  
  
  const navigate = useNavigate();
  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(`${defualt_route}/services-requests`)}>IT Service Center</a>
        <p>SALIC's Assets</p>
      </HistoryNavigation>
      <div className='standard-page asset-managment-center-container'>
        <Tabs 
          loading={!loading}
          items={[
            {key: 1, icon: <HomeOutlined />, title: 'Dashboard', content: <Dashboard />},
            {key: 2, icon: <TableOutlined />, title: 'SALIC Assets', content: 'SALIC Assets'},
            {key: 3, icon: <DatabaseOutlined />, title: 'Delivery Letters', content: "Delivery Letters"},
          ]}
        />
      </div>
    </>
  )
}

export default AllAssets