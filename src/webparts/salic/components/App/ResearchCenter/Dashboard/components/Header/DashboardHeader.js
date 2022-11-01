import React, { useContext } from 'react';
import './DashboardHeader.css';
import { FileSearchOutlined } from '@ant-design/icons';
import { AppCtx } from '../../../../App';
import { useNavigate } from 'react-router-dom';


function DashboardHeader() {
  const { defualt_route } = useContext(AppCtx);
  const navigate = useNavigate();
  return (
    <div className='research_header-container'>
      <div className='header-item'>
        <FileSearchOutlined style={{color: 'var(--main-color)'}} />
        <span onClick={() => navigate(defualt_route+'/research-requests')}>Research Requests</span>
      </div>
    </div>
  )
}

export default DashboardHeader