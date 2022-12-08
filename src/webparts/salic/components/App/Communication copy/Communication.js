import React, { useContext } from 'react';
import './Communication.css';
import { AppCtx } from '../App';
import OrgChart from './mytree';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';







function Communication() {
  const { communicationList } = useContext(AppCtx);


  return (
    <div style={{position: 'relative', top: '85px', minHeight: 'calc(100vh - 85px)'}}>
      <HistoryNavigation>
        <p>Communication</p>
      </HistoryNavigation>

      {
        communicationList.length > 0 
        ? <OrgChart nodes={communicationList} />
        : <div className="loader"><div></div></div>
      }
      
  </div>
  )
}

export default Communication