import React from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';


function MediaCenter() {
  return (
    <>
      <HistoryNavigation>
        <p>Media Center</p>
      </HistoryNavigation>
      <div className='folder-explorer-container'>  
        <iframe
          name='Media Center'
          src='https://salic.sharepoint.com/sites/dev/DevMediaCenter/Forms/AllItems.aspx'
          width='100%'
          height='100%'
        >
        </iframe>
      </div>
    </>
  )
}

export default MediaCenter