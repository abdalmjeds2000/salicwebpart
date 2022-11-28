import React from 'react'
const editStyle = () => {
  try {
    var iframe = document.getElementById("spIframe");
    var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
    elmnt.style.backgroundColor = "#fff";
    var btn = iframe.contentWindow.document.getElementsByClassName("od-ItemContent-header")[0].children[1];
    btn.style.visibility = "hidden";
  } catch {
    console.log('failed hide some elements in Organization iframe');
  }
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