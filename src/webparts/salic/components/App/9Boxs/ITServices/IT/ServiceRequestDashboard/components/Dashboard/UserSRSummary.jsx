import React from 'react';
import { Card, Select, Typography } from 'antd';
import { useState } from 'react';

function UserSRSummary(props) {
  const [dataBy, setDataBy] = useState("Status");
  const DataForUser = props.DataForUser;
  const summaryByStatus = props.summaryByStatus;
  const summaryByPriority = props.summaryByPriority;
  return (
    <Card 
      title={<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        <Typography.Text strong style={{fontSize: '1.2rem'}}>{props.DataForUser?.Surname}'s SR</Typography.Text>
        <Select
          defaultValue="Status"
          bordered={false}
          value={dataBy}
          style={{width: 100}}
          dropdownMatchSelectWidth={false}
          placement="bottomRight"
          onChange={val => setDataBy(val)}
          options={[{value: 'Status', label: 'Status'}, {value: 'Priority', label: 'Priority'}]}
        />
      </div>}
    >
      119 Total SR.
    </Card>
  )
}

export default UserSRSummary