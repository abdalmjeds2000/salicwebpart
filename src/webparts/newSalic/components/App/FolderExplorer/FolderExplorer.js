import React from 'react';  
import './FolderExplorer.css';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';

const FolderExplorerPage = (props) => {

  const editStyle = () => {
    var iframe = document.getElementById("spIframe");
    var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
    elmnt.style.backgroundColor = "#fff";
  }

  return (
    <>
      <HistoryNavigation>
        <p>Folder Explorer</p>
      </HistoryNavigation>

      <div className='folder-explorer-container'>  

        <iframe 
          src='https://salic.sharepoint.com/sites/newsalic/KSA/Forms/AllItems.aspx' 
          width='100%' 
          id='spIframe'
          onLoad={editStyle}
        >
        </iframe>
        {/* <FolderExplorer context={props.context}  
          rootFolder={{  
            Name: 'SitePages',  
            ServerRelativeUrl: '/sites/newsalic/SitePages'
          }}  
          defaultFolder={{  
            Name: 'SitePages',  
            ServerRelativeUrl: '/sites/newsalic/SitePages'  
          }}  
          canCreateFolders={true} />   */}
      </div>
    </>
  )
}

export default FolderExplorerPage