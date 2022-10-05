import React from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';


function ManageEvents() {

  const editStyle = () => {
    var iframe = document.getElementById("spIframe");
    var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
    elmnt.style.backgroundColor = "#fff";
  }


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
          id='spIframe'
          onLoad={editStyle}
        >
        </iframe>
      </div>
    </>
  )
}

export default ManageEvents