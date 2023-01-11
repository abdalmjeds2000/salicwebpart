import React, { useContext, useEffect } from 'react';
import { sp, Web } from '@pnp/sp';
import { AppCtx } from '../App';







const PDFViewer = () => {
  const { sp_context } = useContext(AppCtx);

  const fetchData = async () => {
    return fetch(`https://salic.sharepoint.com/sites/MDM/_api/web/lists/getbytitle('KPIs 2022')/items`, {
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      TESTING ......

    </div>
  )
}

export default PDFViewer