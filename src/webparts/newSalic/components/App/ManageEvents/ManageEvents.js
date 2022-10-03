import React from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';


function ManageEvents() {
  return (
    <>
      <HistoryNavigation>
        <p>Manage Saudi Arabia Events</p>
      </HistoryNavigation>
      <div className='folder-explorer-container'>  
        <iframe
          name='Saudi Arabia Events'
          src='https://salic.sharepoint.com/sites/dev/Lists/Saudi%20Arabia%20Events/AllItems.aspx'
          width='100%'
          height='100%'
        >
        </iframe>
      </div>
    </>
  )
}

export default ManageEvents