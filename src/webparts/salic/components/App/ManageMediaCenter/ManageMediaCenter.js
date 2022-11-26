import React from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';


function ManageMediaCenter() {
  const editStyle = () => {
    var iframe = document.getElementById("spIframe");
    var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
    elmnt.style.backgroundColor = "#fff";
  }
  
  return (
    <>
      <HistoryNavigation>
        <p>Manage Media Center</p>
      </HistoryNavigation>
      <div className='folder-explorer-container'>  
        <iframe
          name='Media Center'
          src='https://salic.sharepoint.com/sites/dev/DevMediaCenter/Forms/AllItems.aspx'
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

export default ManageMediaCenter