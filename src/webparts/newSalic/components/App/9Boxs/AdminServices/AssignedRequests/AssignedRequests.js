import React, { useContext, useEffect } from 'react'
import { List } from 'antd'
import pnp from 'sp-pnp-js';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../../App'

function AssignedRequests() {
  const { maintenance_data, setMaintenanceData, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  useEffect(() => {
    if(maintenance_data.length === 0) {
      pnp.sp.web.lists.getByTitle('Maintenance Request').items.orderBy("Date", false).get()
      .then(res => {
        console.log(res)
        setMaintenanceData(res)
      })
    }
  }, [])

  return (
    <div style={{padding: '25px', position: 'relative', top: '50px'}}>
      <sh1>Assigned Requests</sh1>
      <List
        header={<div>Maintenance Requests</div>}
        bordered
        dataSource={maintenance_data}
        renderItem={(item) => (
          <List.Item>
            <b>Requester:</b> {item.Requester} <br /> 
            <b>Date:</b> {item.Date} <br />
            <b>Location:</b> {item.Location} <br />
            <b>Descriptions:</b> {item.Descriptions} <br />
            <a onClick={() => navigate(`${defualt_route}/admin-services/maintenance/${item.Id}`)}>Update</a>
          </List.Item>
        )}
      />
    </div>
  )
}

export default AssignedRequests