import React from 'react'
import HistoryNavigation from '../../Global/HistoryNavigation/HistoryNavigation';


function RiskStrategy() {

  const editStyle = () => {
    var iframe = document.getElementById("spIframe");
    var elmnt = iframe.contentWindow.document.getElementsByClassName("od-ItemsScopeList-content")[0];
    elmnt.style.backgroundColor = "#fff";
  }

  return (
    <>
      <HistoryNavigation>
        <p>Organization Documents - Risk And Strategy</p>
      </HistoryNavigation>

      <div className='folder-explorer-container'>  
        <iframe 
          src='https://salic.sharepoint.com/sites/newsalic/KnowledgeBase/Forms/AllItems.aspx?id=%2Fsites%2Fnewsalic%2FKnowledgeBase%2FRisk%20And%20Strategy&viewid=b86e96b1%2D5611%2D4e10%2Da7ba%2D42e63e17ddb5' 
          width='100%'
          id='spIframe'
          onLoad={editStyle} 
        >
        </iframe>
      </div>
    </>
  )
}

export default RiskStrategy