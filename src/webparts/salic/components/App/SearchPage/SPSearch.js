import React, { useContext, useEffect, useState } from 'react';
import './searchStyle.css';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import Header from './components/Header';
import Result from './components/Result';
import axios from 'axios';
import { AppCtx } from '../App';



function SPSearch() {
  const [loading, setLoading] = useState(true);
  const { sp_context } = useContext(AppCtx);

  const textsearch = async (SearhcTerm) => {
    const cntxtX = await axios.post(`${sp_context.pageContext.web.absoluteUrl}/_api/contextinfo`)
    const response = await axios({
      method: 'POST',
      url: `${sp_context.pageContext.web.absoluteUrl}/_api/search/postquery`,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": cntxtX.data.FormDigestValue,
      },
      data: JSON.stringify({ 'request': { Querytext: SearhcTerm, RowLimit: 10, StartRow: 25, } }),
    })
  }
  useEffect(() => {textsearch("Akmal")}, [])

  return (
    <>
      <HistoryNavigation>
        <p>Modern Search</p>
      </HistoryNavigation>


      <div className='search-page'>  
        <Header />
        <div className='result-container'>
          <Result />
        </div>
      </div>
    </>
  )
}

export default SPSearch