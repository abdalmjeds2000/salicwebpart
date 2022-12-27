import React, { useEffect, useState } from 'react';
import './CommodityPrices.css';
import GetCommodityPrices from '../../API/GetCommodityPrices';
import { Col, Tabs, Typography } from 'antd';
import AntdLoader from '../../../../Global/AntdLoader/AntdLoader';

function CommodityPrices() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const FetchData = async () => {
    const response = await GetCommodityPrices();
    if(Object.keys(response).length > 1) {
      setData(response);
    }
    setLoading(false);
  }

  useEffect(() => {
    FetchData();
  }, []);




  const MappingDate = () => (
    !loading
    ? (
        data?.map((link, i) => {
          return (
            <Tabs.TabPane tab={link.Title} key={i}>
              <iframe 
                title={link.Title} 
                width="100%" 
                height="100%" 
                src={link.Link}
                frameborder="0" 
                allowFullScreen="true"
                style={{minHeight: 'calc(100vh - 85px)', marginBottom: 25}}
              ></iframe>
            </Tabs.TabPane>
          )
        })
      )
    : <AntdLoader />
  )
  return (
    <div className='commodity-prices-container'>
      <Typography.Title level={3} style={{lineHeight: 2.5}}>Business Intelligence Dashboards</Typography.Title>
      <Col sm={0} md={0} lg={24} style={{padding: 0}}>
        <div className='desktop-tabs'>
          <Tabs defaultActiveKey="0" tabPosition='left' size='large'>
            <MappingDate />
          </Tabs>
        </div>
      </Col>
      <Col md={24} lg={0} style={{padding: 0}}>
        <div className='mobile-tabs'>
          <Tabs defaultActiveKey="0" tabPosition='top' size='small'>
            <MappingDate />
          </Tabs>
        </div>
      </Col>
    </div>
  ) 
}

export default CommodityPrices