import React from 'react';
import { Table } from 'antd';

const Performance = ({ data }) => {
  const PerformanceColumns = [
    { title: 'KPI', dataIndex: 'KPI_NAME', width: '15%' },
    { title: 'Objectives', dataIndex: 'OBJECTIVES', width: '15%' },
    { title: '%', dataIndex: 'MEASURE_ACHIEVE', width: '10%', render: (val) => val ? `${val}%` : ' - ' },
    { title: 'Target', dataIndex: 'TARGET', width: '10%' },
    { title: 'UOM', dataIndex: 'UOM', width: '10%', render: (val) => val !== '%' && val !== '#' ? val : ' - ' },
    { title: 'Weightage', dataIndex: 'WEIGHTAGE', width: '5%'},
    { title: 'Manager KPI', dataIndex: 'Manager_KPI', width: '5%', render: (val) => val ? val : '-' },
    { title: 'Start Day', dataIndex: 'START_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' },
    { title: 'End Day', dataIndex: 'END_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' },
    { title: 'Achieve Date', dataIndex: 'ACHIEVE_DATE', width: '10%', render: (val) => val ? new Date(val).toLocaleDateString() : ' - ' }
  ];



  return (
    <div style={{overflowX: 'auto'}}>
      <Table
        columns={PerformanceColumns} 
        dataSource={data}
        pagination={false}
      />
    </div>
  )
}

export default Performance