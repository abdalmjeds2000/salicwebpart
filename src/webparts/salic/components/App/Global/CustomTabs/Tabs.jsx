import React, { useState } from 'react';
import './Tabs.css';
import AntdLoader from '../AntdLoader/AntdLoader';
import { Tooltip } from 'antd';

const Tabs = ({items, loading}) => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className='custom-tabs-container'>
      <div className='tabbable-panel'>
        <ul className="tab-container">
          {
            items.map((item, i) => (
              <Tooltip title={item.title} mouseEnterDelay={0.7}>
                <a href={`#${item.key}`}>
                  <li key={i} onClick={() => setActiveTab(item.key)} className={activeTab == item.key ? 'active' : ''}>
                    {item.icon} <span className='title'>{item.title}</span>
                  </li>
                </a>
              </Tooltip>
            ))
          }
        </ul>
        <div className='tab-content'>
          {
            !loading
            ? (
                items.map((item, i) => (
                  <div key={i} style={{display: activeTab != item.key ? 'none' : ''}}>
                    {item.content}
                  </div>
                ))
              ) : <AntdLoader />
          }
        </div>
      </div>
    </div>
  )
}

export default Tabs