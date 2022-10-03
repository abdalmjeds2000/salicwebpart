import React from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';


function CorporateServices() {

  return (
    <>
      <HistoryNavigation>
        <p>Organization Documents - Corporate Services</p>
      </HistoryNavigation>

      <div className='folder-explorer-container'>
        <iframe
          src='https://salic.sharepoint.com/sites/newsalic/KnowledgeBase/Forms/AllItems.aspx?id=%2Fsites%2Fnewsalic%2FKnowledgeBase%2FCorporate%20Services&viewid=b86e96b1%2D5611%2D4e10%2Da7ba%2D42e63e17ddb5' 
          width='100%' 
        >
        </iframe>
      </div>
    </>
  )
}

export default CorporateServices