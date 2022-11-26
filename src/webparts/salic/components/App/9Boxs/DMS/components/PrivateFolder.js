import React, { useContext } from 'react'
import { AppCtx } from '../../../App';


function PrivateFolder() {
  const { user_data } = useContext(AppCtx);
    return (
      Object.keys(user_data).length > 1
      ? <div>
          <iframe 
            // src={`https://salic.sharepoint.com/sites/newsalic/${user_data?.Data?.GraphId?.replace(/-/g, "")}/Forms/AllItems.aspx`} 
            src={`https://salic-my.sharepoint.com/personal/${user_data?.Data?.Mail?.replace(/[@.]/g,'_')}/_layouts/15/onedrive.aspx?view=3`}
            width='100%'
            id='spIframePrivateFolder'
          >
          </iframe>
        </div>
      : <></>
    )
}

export default PrivateFolder