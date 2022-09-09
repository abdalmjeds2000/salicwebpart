import React, { useContext } from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';
import SimpleUserPanel from '../../Global/SimpleUserPanel/SimpleUserPanel';
import WorldBG from '../../../../assets/images/world.svg';
import { AppCtx } from '../../App';


function Legal() {
  const { user_data, notifications_count, mail_count } = useContext(AppCtx);


  return (
    <>
      <HistoryNavigation>
        <p>Organization Documents - Legal</p>
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
          src='https://salic.sharepoint.com/sites/newsalic/KnowledgeBase/Forms/AllItems.aspx?id=%2Fsites%2Fnewsalic%2FKnowledgeBase%2FLegal&viewid=b86e96b1%2D5611%2D4e10%2Da7ba%2D42e63e17ddb5' 
          width='100%' 
        >
        </iframe>
      </div>
    </>
  )
}

export default Legal