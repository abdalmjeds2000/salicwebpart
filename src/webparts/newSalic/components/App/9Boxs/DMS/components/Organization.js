import React from 'react'
const editStyle = () => {
  var iframe = document.getElementById("spIframe");
  var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
  elmnt.style.backgroundColor = "#fff";
}


function Organization() {
  return (
    <div>
      <iframe 
        src='https://salic.sharepoint.com/sites/newsalic/KSA/Forms/AllItems.aspx' 
        width='100%'
        id='spIframe'
        onLoad={editStyle}
      >
      </iframe>
    </div>
  )
}

export default Organization