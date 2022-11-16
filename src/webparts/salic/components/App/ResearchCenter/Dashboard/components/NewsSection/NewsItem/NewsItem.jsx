import React, { useState } from 'react';
import { Modal, Typography } from 'antd';
import moment from 'moment';
import { CalendarOutlined, CaretDownOutlined, CaretUpOutlined, ReadOutlined } from '@ant-design/icons';
import './NewsItem.css';



function NewsItem({ title, body, createdDate }) {
  const [openModal, setOpenModal] = useState(false);

  const [expand, setExpand] = useState(false);
  const [counter, setCounter] = useState(0);


  var newsStyle = {

  }


  const toggleExpand = () => {
    setExpand(!expand);
    setCounter(prev => !expand ? prev+0 : prev+1);
  };

  return (
    <>
      <div className='research-weakly-news-item' key={counter} onClick={() => setOpenModal(true)}>
        <Typography.Title level={5}>{title}</Typography.Title>
        <div key={counter} className='ellipsis-paragraph'>
          <div dangerouslySetInnerHTML={{__html: body}}></div>
        </div>
        <Typography.Text type='secondary'><CalendarOutlined /> {moment(createdDate).format('MM/DD/YYYY hh:mm:ss')}</Typography.Text>
      </div>
      <Modal
        title={<><ReadOutlined /> {title}</>}
        open={openModal} 
        okButtonProps={{style: {display: 'none'}}}
        onCancel={() => setOpenModal(false)}
      >
        <div dangerouslySetInnerHTML={{__html: body}}></div>
      </Modal>
    </>



    // <div style={newsStyle} key={counter}>
    //   <div key={counter} className={`${!expand ? 'ellipsis-paragraph' : 'stop-ellipsis'}`}>
    //     <div dangerouslySetInnerHTML={{__html: body}}></div>
    //   </div>
    //   <Typography.Link style={{display: 'block', textAlign: 'center', color: '#d5d5d5'}} onClick={toggleExpand}>{ expand ? <CaretUpOutlined /> : <CaretDownOutlined /> }</Typography.Link>
    //   <Typography.Text type='secondary'><CalendarOutlined /> {moment(createdDate).format('MM/DD/YYYY hh:mm:ss')}</Typography.Text>
    // </div>
  )
}

export default NewsItem