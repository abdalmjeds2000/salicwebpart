import React from 'react';
import { Col, Empty, Row } from 'antd';
import KPICard from './KPICard/KPICard';

const KPIProgress = ({ data }) => {



  if(!data || data.length == 0) {
    return (
      <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <Empty />
      </div>
    )
  }
  return (
    <div style={{padding: '10px 0'}}>
      <Row gutter={[20, 20]}>
          {
            data.map((row, i) => (
              <Col key={i} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
                <KPICard
                  title={row.KPI_NAME.replace(/[%#]/g, '').trim()}
                  description={row.OBJECTIVES}
                  sDate={new Date(row.START_DATE).toLocaleDateString()}
                  eDate={new Date(row.END_DATE).toLocaleDateString()}
                  achieveDate={row.ACHIEVE_DATE ? new Date(row.ACHIEVE_DATE).toLocaleDateString() : null}
                  value={row.MEASURE_ACHIEVE}
                  maxVal={row.TARGET.replace(/[%#]/g, '').trim()}
                  valueType={
                    ["number", "#"].includes(row.UOM?.toLowerCase()) 
                      ? "#" 
                    : ["percentage", "%"].includes(row.UOM?.toLowerCase())
                      ? "%"
                    : "%"
                    // : row?.KPI_NAME?.trim()[0]
                  }
                  // themeColor={row.UOM == "Number" ? "#b58bff" : row.UOM == "Percentage" ? "#ffb864" : "#74c4ff"}
                />
                {/* <Card style={{height: '100%'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

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
                </Card> */}
              </Col>
            ))
          }
      </Row>
    </div>
  )
}

export default KPIProgress