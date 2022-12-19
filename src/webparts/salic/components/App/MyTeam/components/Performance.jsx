import React from 'react';
import { Card, Col, Progress, Row, Table, Typography } from 'antd';
import { CaretRightOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

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

const x = `<div style={{width: 90, height: 90, marginBottom: 15}}>
<CircularProgressbar
  value={row?.MEASURE_ACHIEVE}
  text={row?.MEASURE_ACHIEVE + '%'}
  minValue={0}
  maxValue={/* row?.TARGET */100}
  styles={buildStyles({
    
    pathColor: 'var(--link-text-color)',
    trailColor: '#ddd',
    textSize: '2rem',
    // textColor: props.textColor,
  })
  }
/>
</div>`

  return (
    <div>
      {/* <Table
        columns={PerformanceColumns} 
        dataSource={data}
        pagination={false}
      /> */}



      <Row gutter={[20, 20]}>
          {
            data.map((row, i) => (
              <Col key={i} xs={24} sm={12} md={8} lg={6} xl={6} xxl={4}>
                <Card style={{height: '100%'}}>
                  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                    <div style={{marginBottom: 15}}>
                      <Progress 
                        type="circle" 
                        percent={row?.MEASURE_ACHIEVE} 
                        format={(percent) => `${percent}%`}
                        width={75}
                      />
                    </div>

                    <Typography.Title level={4} title='KPI Name'>{row?.KPI_NAME}</Typography.Title>
                    <Typography.Text type='secondary' title='Start & End Date' style={{display: 'block'}}>{new Date(row?.START_DATE).toLocaleDateString()} <CaretRightOutlined /> {new Date(row?.END_DATE).toLocaleDateString()}</Typography.Text>
                    {row?.ACHIEVE_DATE ? <Typography.Text type='success' title='Achieve Date'><CheckCircleOutlined /> {new Date(row?.ACHIEVE_DATE).toLocaleDateString()}</Typography.Text> : null}
                  </div>
                </Card>
              </Col>
            ))
          }
      </Row>
    </div>
  )
}

export default Performance