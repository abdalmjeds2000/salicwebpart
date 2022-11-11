import React from 'react';
import '../CustomProgressChart/CustomChart.css';
import { Card, Select, Typography } from 'antd';
import { useState } from 'react';
import ProgressRowItem from '../CustomProgressChart/ProgressRowItem';


function UserSRSummary(props) {
  const [dataBy, setDataBy] = useState("Status");
  const summaryByStatus = props.summaryByStatus;
  const summaryByPriority = props.summaryByPriority;

  let TotalCount = 0;
  summaryByPriority.forEach(element => TotalCount += element.Count);
  const SubmittedCount = summaryByStatus?.filter(row => row.key=="SUBMITTED")[0]?.Count;
  const ProcessingCount = summaryByStatus?.filter(row => row.key=="PROCESSING")[0]?.Count;
  const ClosedCount = summaryByStatus?.filter(row => row.key=="CLOSED")[0]?.Count;

  const NormalCount = summaryByPriority?.filter(row => row.key=="1")[0]?.Count;
  const CriticalCount = summaryByPriority?.filter(row => row.key=="2")[0]?.Count;
  
  const CardTitle = (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
      <Typography.Text strong style={{fontSize: '1.2rem'}}>{props.DataForUser?.title}'s SR</Typography.Text>
      <Select
        defaultValue="Status"
        bordered={false}
        value={dataBy}
        style={{width: 90}}
        dropdownMatchSelectWidth={false}
        placement="bottomRight"
        onChange={val => setDataBy(val)}
        options={[{value: 'Status', label: 'Status'}, {value: 'Priority', label: 'Priority'}]}
      />
    </div>
  )
  return (
    <div className='sr-user-summary card-container'>
      <Card title={CardTitle}>
        <div className='tab-pane'>
          <Typography.Text style={{fontSize: '4em', display: 'inline-block', margin: '0 10px 10px 0', fontWeight: 700}}>
            {TotalCount}
          </Typography.Text>
          <Typography.Text>Total SR.</Typography.Text>

          {
            dataBy == "Status"
            ? (
              <div className='custom-progress'>
                <div className='progress'>
                  <div style={{width: `${(ProcessingCount/TotalCount)*100}%`}} className='progress-bar bg-warning' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                  <div style={{width: `${(SubmittedCount/TotalCount)*100}%`}} className='progress-bar bg-info' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                  <div style={{width: `${(ClosedCount/TotalCount)*100}%`}} className='progress-bar bg-success' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <ProgressRowItem type="info" title="Submitted" desc="Submitted and No Action" count={`${SubmittedCount} SR.`} />
                <ProgressRowItem type="warning" title="Processing" desc="SR. currently you are working on" count={`${ProcessingCount} SR.`} />
                <ProgressRowItem type="success" title="Closed" desc="SR. you Handled" count={`${ClosedCount} SR.`} />
              </div>
              )
            : (
              <div className='custom-progress'>
                <div className='progress'>
                  <div style={{width: `${(NormalCount/TotalCount)*100}%`}} className='progress-bar bg-info' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                  <div style={{width: `${(CriticalCount/TotalCount)*100}%`}} className='progress-bar bg-danger' aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <ProgressRowItem type="info" title="Normal" desc="Normal SR. - Default" count={`${NormalCount} SR.`} />
                <ProgressRowItem type="danger" title="Critical" desc="Urgent and Important SR." count={`${CriticalCount} SR.`} />
              </div>
              )
          }
        </div>
      </Card>
    </div>
  )
}

export default UserSRSummary