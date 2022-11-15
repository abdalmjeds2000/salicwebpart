import React, { useState } from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import { CalendarOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';




function NewsItem({ body, createdDate }) {
  const [expand, setExpand] = useState(false);
  const [counter, setCounter] = useState(0);

  var newsStyle = {
    backgroundColor: '#f3f8ff',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: 10
  }


  const toggleExpand = () => {
    setExpand(!expand);
    setCounter(prev => !expand ? prev+0 : prev+1);
  };

  return (
    <div style={newsStyle} key={counter}>
      <div key={counter} className={`${!expand ? 'ellipsis-paragraph' : 'stop-ellipsis'}`}>
        <div dangerouslySetInnerHTML={{__html: body}}></div>
      </div>
      <Typography.Link style={{display: 'block', textAlign: 'center', color: '#d5d5d5'}} onClick={toggleExpand}>{ expand ? <CaretUpOutlined /> : <CaretDownOutlined /> }</Typography.Link>
      <Typography.Text type='secondary'><CalendarOutlined /> {moment(createdDate).format('MM/DD/YYYY hh:mm:ss')}</Typography.Text>
    </div>
  )
}

export default NewsItem