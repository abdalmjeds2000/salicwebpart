import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../../../App';
import HistoryNavigation from '../../../../../Global/HistoryNavigation/HistoryNavigation';


function KnowledgeCenter() {
  const { defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  return (
    <>
      <HistoryNavigation>
        <a onClick={() => navigate(defualt_route + '/research-library')}>Research Library</a>
        <a onClick={() => navigate(defualt_route + '/manage-research-library')}>Manage Research Library Content</a>
        <p>Knowledge Center</p>
      </HistoryNavigation>
      <div className='folder-explorer-container'>  
        <iframe
          name='Knowledge Center'
          src='https://salic.sharepoint.com/sites/dev/Lists/Knowledge/AllItems.aspx'
          width='100%'
          height='100%'
        >
        </iframe>
      </div>
    </>
  )
}

export default KnowledgeCenter