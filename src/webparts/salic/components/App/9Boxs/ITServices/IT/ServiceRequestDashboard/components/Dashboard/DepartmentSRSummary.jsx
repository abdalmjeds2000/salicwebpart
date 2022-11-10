import React, { useState } from 'react';
import { Card, Select, Typography } from 'antd';

function DepartmentSRSummary(props) {
  const [dataBy, setDataBy] = useState("Status");
  const summaryByDepartment = props.summaryByDepartment;
  return (
    <div>
      <Card 
        title={
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
            <Typography.Text strong style={{fontSize: '1.2rem'}}>{props.DataForUser.Department} SR.</Typography.Text>
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
          </div>
        }
      >
        SR Department Summary
      </Card>
    </div>
  )
}

export default DepartmentSRSummary