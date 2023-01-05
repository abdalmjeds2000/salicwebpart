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
                  value={row?.MEASURE_ACHIEVE && row?.MEASURE_ACHIEVE <= 100 ? row?.MEASURE_ACHIEVE : 100}
                  maxVal={100}
                  valueType={
                    ["number", "#"].includes(row.UOM?.toLowerCase()) 
                      ? "#" 
                    : ["percentage", "%"].includes(row.UOM?.toLowerCase())
                      ? "%"
                    : "%"
                  }
                />
              </Col>
            ))
          }
      </Row>
    </div>
  )
}

export default KPIProgress