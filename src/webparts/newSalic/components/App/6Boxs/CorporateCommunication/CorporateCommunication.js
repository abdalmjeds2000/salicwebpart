import React, { useContext } from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../../App';


function CorporateCommunication() {


  return (
    <>
      <HistoryNavigation>
        <p>Organization Documents - Corporate Communication</p>
      </HistoryNavigation>
      <div className='folder-explorer-container'>  
        <iframe 
          src='https://salic.sharepoint.com/sites/newsalic/KnowledgeBase/Forms/AllItems.aspx?id=%2Fsites%2Fnewsalic%2FKnowledgeBase%2FCorporate%20Communication&viewid=b86e96b1%2D5611%2D4e10%2Da7ba%2D42e63e17ddb5' 
          width='100%' 
        >
        </iframe>
      </div>
    </>
  )
}

export default CorporateCommunication