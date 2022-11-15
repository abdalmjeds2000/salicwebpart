import React, { useContext } from 'react';
import './DashboardHeader.css';
import { AppCtx } from '../../../../App';
import { useNavigate } from 'react-router-dom';
import { FileSearchOutlined, SettingOutlined } from '@ant-design/icons';
import HeaderButton from './HeaderButton';

function DashboardHeader() {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();

  return (
    <div className='research_header-container'>
      <HeaderButton
        title="Research Requests"
        icon={<FileSearchOutlined style={{color: 'var(--main-color)'}} />}
        onClick={() => navigate(defualt_route+'/research-requests')} 
      />
      <HeaderButton
        title="Manage Research Library"
        icon={<SettingOutlined style={{color: 'var(--main-color)'}} />}
        onClick={() => navigate(defualt_route+'/manage-research-library')} 
      />
    </div>
  )
}

export default DashboardHeader