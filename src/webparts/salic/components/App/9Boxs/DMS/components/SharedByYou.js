import React, { useContext } from 'react'
import { AppCtx } from '../../../App';


function SharedByYou() {
  const { user_data } = useContext(AppCtx);
    return (
      Object.keys(user_data).length > 1
      ? <div>
          <iframe 
            // src={`https://salic-my.sharepoint.com/personal/${user_data?.Data?.Mail?.replace(/[@.]/g,'_')}/_layouts/15/onedrive.aspx?view=3`}
            src={`https://salic-my.sharepoint.com/personal/${user_data?.Data?.Mail?.replace(/[@.]/g,'_')}/_layouts/15/onedrive.aspx?view=20`}
            
            width='100%'
            id='SharedWithYouFolder'
          >
          </iframe>
        </div>
      : <></>
    )
}

export default SharedByYou