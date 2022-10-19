import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';


const AntdLoader = () => {

  return (
    <Spin 
      indicator={<LoadingOutlined spin style={{fontSize: '3rem', position: 'absolute', left: 'calc(50% - 1.5rem)', top: 'calc(50% - 1.5rem)', color: 'var(--main-color)' }} />} 
    />
  )
}

export default AntdLoader;