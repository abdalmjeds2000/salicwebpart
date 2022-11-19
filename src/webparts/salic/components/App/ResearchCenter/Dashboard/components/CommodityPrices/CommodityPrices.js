import React, { useEffect, useState } from 'react';
import './CommodityPrices.css';
import GetCommodityPrices from '../../API/GetCommodityPrices';
import { Tabs, Typography } from 'antd';
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


  return (
    
    <div className='commodity-prices-container'>
      <Typography.Title level={3} style={{lineHeight: 2.5}}>Business Intelligence Dashboards</Typography.Title>
      <div style={{/* backgroundColor: '#fff', padding: 15, borderRadius: 15, overflow: 'hidden' */}}>
        <Tabs defaultActiveKey="0" tabPosition='left'>
          {
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
                // <Row gutter={[30, 30]}>
                //   {
                //     data.map((link, i) => {

                //       return (
                //         <Col key={i} xs={24} sm={24} md={24} lg={12} style={{borderRadius: 20, overflow: 'hidden'}}>
                //           <Typography.Title level={4} style={{lineHeight: 2}}>{link.Title}</Typography.Title>
                //           <iframe 
                //             title={link.Title} 
                //             width="100%" 
                //             height="100%" 
                //             src={link.Link}
                //             frameborder="0" 
                //             allowFullScreen="true"
                //             style={{minHeight: '450px', marginBottom: 25}}
                //           ></iframe>
                //         </Col>
                //       )
                //     })
                //   }
                // </Row>
              )
            : <AntdLoader />
          }
        </Tabs>
      </div>
    </div>
  )
}

export default CommodityPrices