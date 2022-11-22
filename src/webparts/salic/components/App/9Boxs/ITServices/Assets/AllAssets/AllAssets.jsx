import React, { useState } from 'react';
import { DatabaseOutlined, HomeOutlined, TableOutlined } from '@ant-design/icons';
import Tabs from '../../../../Global/CustomTabs/Tabs';

const AllAssets = () => {
  const [loading, setLoading] = useState(true);
  
  return (
    <div className='standard-page asset-managment-center-container'>
      <Tabs 
        loading={!loading}
        items={[
          {key: 1, icon: <HomeOutlined />, title: 'Dashboard', content: 'Dashboard'},
          {key: 2, icon: <TableOutlined />, title: 'SALIC Assets', content: 'SALIC Assets'},
          {key: 3, icon: <DatabaseOutlined />, title: 'Delivery Letters', content: "Delivery Letters"},
        ]}
      />
    </div>
  )
}

export default AllAssets