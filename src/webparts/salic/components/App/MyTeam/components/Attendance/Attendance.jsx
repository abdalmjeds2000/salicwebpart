import React from 'react';
import './Attendance.css';
import { Table } from 'antd';


const Attendance = ({ data }) => {

  const columns = [
    { title: 'Employee Name', dataIndex: 'Name', render: (val) => val || ' - '},
    { title: 'Date', dataIndex: 'Date', render: (val) => val || ' - '},
    { title: 'Day', dataIndex: 'Day', render: (val) => val || ' - '},
    { title: 'Check-In', dataIndex: 'CheckInTime', render: (val) => val || ' - '},
    { title: 'Check-Out', dataIndex: 'CheckOutTime', render: (val) => val || ' - '},
    { title: 'W. Time', dataIndex: 'ActualHours', render: (val) => val || ' - '},
    { title: 'W. Time (8-16)', dataIndex: 'Working8_16', render: (val) => val || ' - '},
    { title: 'Late', dataIndex: 'Late' },
    { title: 'Early Leave', dataIndex: 'EarlyLeave', render: (val) => val || ' - '},
    { title: 'Overtime', dataIndex: 'OverTime', render: (val) => val || ' - '},
    { title: 'Attendance Status', dataIndex: 'IsAbsent', render: (val) => val ? 'Absent' : 'Delayed or Early Leave'},
    { title: 'Emp. Justification', dataIndex: 'Justification', render: (val) => val || ' - '},
    { title: 'Manager Feedback', dataIndex: 'ManagerFeedback', render: (val) => val || ' - '},
    { title: 'Approval Status', dataIndex: 'JustificationStatus', render: (val) => val || ' - '},
  ]

  return (
    <div className='my-team-attendance' style={{overflowX: 'auto'}}>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{position: ['none', 'bottomCenter'], pageSize: 50, hideOnSinglePage: true }} 
      />
    </div>
  )
}

export default Attendance