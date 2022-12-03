import React, { useContext } from 'react';
import './DashboardHeader.css';
import { AppCtx } from '../../../../App';
import { useNavigate } from 'react-router-dom';
import { FileSearchOutlined, RedoOutlined, SettingOutlined } from '@ant-design/icons';
import HeaderButton from './HeaderButton';
import { FetchData } from '../../ResearchDashboard';

function DashboardHeader({ onRefresh }) {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  const iconStyle = {
    color: 'var(--main-color)'
  }
  return (
    <div className='research_header-container'>
      <HeaderButton
        title="Submit Research Request"
        icon={<FileSearchOutlined style={iconStyle} />}
        onClick={() => navigate(defualt_route+'/research-requests')} 
      />
      <HeaderButton
        title="Manage Library"
        icon={<SettingOutlined style={iconStyle} />}
        onClick={() => navigate(defualt_route+'/manage-research-library')} 
      />
      <HeaderButton
        title="Refresh"
        icon={<RedoOutlined style={iconStyle} />}
        onClick={onRefresh} 
      />
    </div>
  )
}

export default DashboardHeader