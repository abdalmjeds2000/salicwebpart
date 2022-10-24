import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';


const AntdLoader = () => {

  return (
    <Spin 
      indicator={<LoadingOutlined spin style={{fontSize: '1rem', position: 'relative', left: '50%', transform: 'translateX(-50)', color: 'var(--main-color)' }} />} 
    />
  )
}

export default AntdLoader;