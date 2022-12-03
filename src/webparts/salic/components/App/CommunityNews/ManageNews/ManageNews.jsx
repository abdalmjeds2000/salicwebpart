import React from 'react';
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';


function ManageNews() {

  return (
    <>
      <HistoryNavigation>
        <p>Manage News</p>
      </HistoryNavigation>

      <div className='folder-explorer-container'>  
        <iframe
          name='manage-news'
          src='https://salic.sharepoint.com/sites/newsalic/Lists/News/AllItems.aspx'
          width='100%'
          height='100%'
        >
        </iframe>
      </div>
    </>
  )
}

export default ManageNews