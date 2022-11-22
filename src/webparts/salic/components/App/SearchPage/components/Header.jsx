import React from 'react';
import { Col, Input, Row, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const Header = () => {
  return (
    <div className='search-page-header'>
      <Typography.Title level={1}>Search Inside SharePoint</Typography.Title>

      <div>
        <Row gutter={25} justify="center">
          <Col sm={24} md={20} lg={18}>
            <Input.Search 
              placeholder="input search text" 
              enterButton={<><SearchOutlined /> Search</>} 
              size="large" 
              loading={false} 
              style={{borderRadius: '7px', overflow: 'hidden'}}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header