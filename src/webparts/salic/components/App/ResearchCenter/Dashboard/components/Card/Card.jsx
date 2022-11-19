import React from 'react';
import { Typography } from 'antd';
import './Card.css';

function Card({ imgSrc, title, openFile, imgCustomStyle }) {
  return (
    <div className='custom-img-card' style={{...imgCustomStyle}} onClick={openFile}>
      <div className='card-container full-w-h' style={{backgroundImage: `url("${imgSrc}")`}}>
        <div className='content'>
          <Typography.Text strong style={{color: '#fff', fontSize: '1rem'}}>{title}</Typography.Text>
        </div>
      </div>
    </div>
  )
}

export default Card