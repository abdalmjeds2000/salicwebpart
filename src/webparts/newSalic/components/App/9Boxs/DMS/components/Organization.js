import React from 'react'
const editStyle = () => {
  var iframe = document.getElementById("spIframe");
  var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
  elmnt.style.backgroundColor = "#fff";
  var btn = iframe.contentWindow.document.getElementsByClassName("librariesDropdown_c258b0e8");
  btn[0].style.display = "none";
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