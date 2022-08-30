import React, { useContext } from 'react';  
import './FolderExplorer.css';
import { FolderExplorer, IFolder } from "@pnp/spfx-controls-react/lib/FolderExplorer";  
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../Global/SimpleUserPanel/SimpleUserPanel';
import WorldBG from '../../../assets/images/world.svg';
import { AppCtx } from '../App';


const FolderExplorerPage = (props) => {
  const { user_data, notifications_count, mail_count } = useContext(AppCtx);


  return (
    <>
      <HistoryNavigation>
        <p>Folder Explorer</p>
      </HistoryNavigation>
      <img src={WorldBG} className='img-bg' alt="world background" />
      <div className='folder-explorer-container'>  
        <SimpleUserPanel
          userImage={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=${user_data.Data?.Mail}`}
          userName={user_data.Data?.DisplayName}
          notificationsCount={notifications_count}
          mailCount={mail_count}
        />

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