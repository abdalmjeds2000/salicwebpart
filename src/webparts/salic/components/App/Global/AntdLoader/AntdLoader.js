import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const AntdLoader = () => {

  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: '100px 25px 25px 25px'}}>
      <Spin indicator={<LoadingOutlined spin />} />
    </div>
  )
}

export default AntdLoader;