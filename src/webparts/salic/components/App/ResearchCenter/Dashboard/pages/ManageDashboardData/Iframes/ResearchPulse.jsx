import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../../App';
import HistoryNavigation from '../../../../../Global/HistoryNavigation/HistoryNavigation';


function ResearchPulse() {
  const { defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-center')}>Research Library</a>
        <a onClick={() => navigate(defualt_route + '/manage-research-library')}>Manage Research Library Content</a>
        <p>Research Pulse</p>
      </HistoryNavigation>
      <div className='folder-explorer-container'>  
        <iframe
          name='Research Pulse'
          src='https://salic.sharepoint.com/sites/dev/Lists/Research%20Pulse/AllItems.aspx'
          width='100%'
          height='100%'
        >
        </iframe>
      </div>
    </>
  )
}

export default ResearchPulse