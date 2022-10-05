import React, { useContext } from 'react'
import { AppCtx } from '../../../App';


const editStyle = () => {
  var iframe = document.getElementById("spIframePrivateFolder");
  var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
  elmnt.style.backgroundColor = "#fff";
}


function PrivateFolder() {
  const { user_data } = useContext(AppCtx);
    return (
      Object.keys(user_data).length > 0
      ? <div>
          <iframe 
            src={`https://salic.sharepoint.com/sites/newsalic/${user_data?.Data?.GraphId?.replace(/-/g, "")}/Forms/AllItems.aspx`} 
            width='100%'
            id='spIframePrivateFolder'
            onLoad={editStyle}
          >
          </iframe>
        </div>
      : <></>
    )
}

export default PrivateFolder