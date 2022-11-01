import React from 'react';
import './Dashboard.css';
import DashboardHeader from './components/Header/DashboardHeader';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';

function ResearchDashboard() {
  return (
    <>
      <HistoryNavigation>
        <p>Research Center</p>
      </HistoryNavigation>

      <div className='research-center_dashboard-container'>
        <DashboardHeader />
      </div>
    </>
  )
}

export default ResearchDashboard