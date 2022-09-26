import React from 'react';  
import './FolderExplorer.css';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';

const FolderExplorerPage = (props) => {


  return (
    <>
      <HistoryNavigation>
        <p>Folder Explorer</p>
      </HistoryNavigation>

      <div className='folder-explorer-container'>  

        <iframe 
          src='https://salic.sharepoint.com/sites/newsalic/KSA/Forms/AllItems.aspx' 
          width='100%' 
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