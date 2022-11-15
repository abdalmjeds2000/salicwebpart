import { LoadingOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import GetCommodityPrices from '../../API/GetCommodityPrices';

function CommodityPrices() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const FetchData = async () => {
    const response = await GetCommodityPrices();
    if(response) {
      setData(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    FetchData();
  }, []);


  return (
    
    <div>
      <Typography.Title level={3} style={{lineHeight: 2.5}}>Commodity Prices</Typography.Title>
      {
        !loading
        ? (
            <Row gutter={[30, 30]}>
              {
                data.map((link, i) => {

                  return (
                    <Col key={i} xs={24} sm={24} md={24} lg={12} style={{borderRadius: 20, overflow: 'hidden'}}>
                      <Typography.Title level={4} style={{lineHeight: 2}}>{link.Link.Description}</Typography.Title>
                      <iframe 
                        title={link.Link.Description} 
                        width="100%" 
                        height="100%" 
                        src={link.Link.Url}
                        frameborder="0" 
                        allowFullScreen="true"
                        style={{minHeight: '450px', marginBottom: 25}}
                      ></iframe>
                    </Col>
                  )
                })
              }
            </Row>
          )
        : <div style={{display: 'flex', justifyContent: 'center', margin: 25}}>
            <Spin indicator={<LoadingOutlined spin />} />
          </div>
      }
      
    </div>
  )
}

export default CommodityPrices