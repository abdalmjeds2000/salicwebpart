import React, { useState } from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';


function SPSearch() {
  const [loading, setLoading] = useState(true);

  const removeSpElements = () => {
    // try {
    //   let element = document.getElementById("sp-modern-search");
    //   let elmnt2 = element.contentWindow.document.getElementById("RecommendedItems");
    //   elmnt2.style = "display: none;"
    //   let elmnt3 = element.contentWindow.document.getElementById("CommentsWrapper");
    //   elmnt3.style = "display: none;"
    //   let elmnt4 = element.contentWindow.document.getElementById("RecommendedItems");
    //   elmnt4.style = "display: none;"
    //   let elmnt1 = element.contentWindow.document.getElementsByClassName("er_t_ada2ac09")[0];
    //   elmnt1.style = "display: none;"
    // } catch {
    //   console.log('sp')
    // }

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