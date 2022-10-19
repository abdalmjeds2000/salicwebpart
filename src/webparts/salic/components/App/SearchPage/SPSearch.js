import React, { useState } from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';


function SPSearch() {
  const [loading, setLoading] = useState(true);

  const removeSpElements = () => {
    const element = document.getElementById("sp-modern-search");
    let elmnt1 = element.contentWindow.document.getElementsByClassName("rf_bu_ada2ac09")[0];
    let elmnt2 = element.contentWindow.document.getElementById("RecommendedItems");
    let elmnt3 = element.contentWindow.document.getElementById("CommentsWrapper");
    let elmnt4 = element.contentWindow.document.getElementById("RecommendedItems");
    elmnt1.style = "display: none;"
    elmnt2.style = "display: none;"
    elmnt3.style = "display: none;"
    elmnt4.style = "display: none;"

    setLoading(false);
  }


  return (
    <>
      <HistoryNavigation>
        <p>Modern Search</p>
      </HistoryNavigation>
      <div className='folder-explorer-container' style={{padding: 0, display: loading ? 'none' : 'block'}}>  
        <iframe
          name='Modern Search'
          src='https://salic.sharepoint.com/sites/dev/SitePages/Modern-Search.aspx'
          width='100%'
          height='100%'
          id='sp-modern-search'
          onLoad={removeSpElements}
          style={{minHeight: 'calc(100vh - 85px)'}}
        >
        </iframe>
        {loading ? "LOADING..." : null}
      </div>
    </>
  )
}

export default SPSearch