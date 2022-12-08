import React, { useContext } from 'react';
// import './Communication.css';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../App';
import OrganizationalChart from "./D3OrgChart/orgChart";

function Communication() {
  const { communicationList } = useContext(AppCtx);

  const mappingData = communicationList?.map((row) => {
    row['parentId'] = row['pid'];
    delete row['pid'];
    row['positionName'] = row['title'];
    delete row['title'];
    row['imageUrl'] = row['img'];
    delete row['img'];
    row['phone'] = row['Mobile'];
    delete row['Mobile'];
    return row;
  })
  return (
    <>
      <HistoryNavigation>
        <p>Communication</p>
      </HistoryNavigation>


      <div style={{position: 'relative', top: '85px', minHeight: 'calc(100vh - 85px)'}}>
        <OrganizationalChart data={mappingData} />
      </div>
    </>
  );
}

export default Communication