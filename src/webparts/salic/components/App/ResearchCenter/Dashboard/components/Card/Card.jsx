import { Typography } from 'antd';
import React from 'react';
import './Card.css';

function Card({ imgSrc, title, openFile }) {
  return (
    <div className='custom-img-card' onClick={openFile}>
      <div className='card-container full-w-h' style={{backgroundImage: `url("${imgSrc}")`}}>
        <div className='content'>
          <Typography.Text strong style={{color: '#fff', fontSize: '1rem'}}>{title}</Typography.Text>
        </div>
      </div>
    </div>
  )
}

export default Card