import React, { useContext } from 'react';
import HistoryNavigation from '../Global/HistoryNavigation/HistoryNavigation';
import { AppCtx } from '../App';
import OrganizationalChart from "./D3OrgChart/orgChart";
import AntdLoader from '../Global/AntdLoader/AntdLoader';



function appendChild (n, all, index){
  var xx = all.filter(x=>x.pid === n.id);
  index++;
  for (var s of xx){
    if(index > 5) {
      index = 5
    }
    n.INDEX = index;
    appendChild(s, all, 0);
  }
}





function Communication() {
  const { user_data, communicationList } = useContext(AppCtx);

  // const gate = {
  //   "id": "0",
  //   "pid": null,
  //   "name": null,
  //   "title": null,
  //   "email": null,
  //   "img": "https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=M&username=stsadmin@salic.onmicrosoft.com",
  //   "department": null,
  //   "Ext": null,
  //   "Mobile": null,
  //   "assistance": false
  // }
  // const datawithsalic = [gate , ...communicationList];
  // const data = datawithsalic.map(r => {
  //   if(r.id == "1") {
  //     r.pid = "0";
  //   }
  //   return r;
  // });



  if(Object.keys(user_data).length === 0 && Object.keys(communicationList).length === 0) {
    return <AntdLoader />
  }
  return (
    <>
      <HistoryNavigation>
        <p>Communication</p>
      </HistoryNavigation>


      <div style={{position: 'relative', top: '85px', minHeight: 'calc(100vh - 85px)'}}>
        <OrganizationalChart data={communicationList} />
      </div>
    </>
  );
}

export default Communication