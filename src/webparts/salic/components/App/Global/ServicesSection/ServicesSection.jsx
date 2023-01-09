import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesSection.css';
import { AppCtx } from "../../App";
import { Typography } from 'antd';
import { MdOpenInNew } from 'react-icons/md';

const ServicesSection = ({ title, items, headerIcon }) => {
  const { defualt_route } = useContext(AppCtx)
  const navigate = useNavigate();


  return (
    <div className='services-page-container'>
      <div className="header">
        {headerIcon}
        <h2>{title}</h2>
      </div>

      <div className='services-body-container'>
        <div className="services-boxs-container">
          {items.map((service, i) => {
            return ( 
              <a
                key={i}
                className="box"
                onClick={() => {
                  service.isLink
                  ? window.open(service.to, "_blank")
                  : navigate(defualt_route + service.to)
                }}
              >
                <div className='img-container' style={{ backgroundColor: service.bgColor }}>
                  {service.icon}
                </div>
                <div>
                  <h3>{service.text} {service.isLink ? <span className='open-in-new'><MdOpenInNew /></span> : ''}</h3>
                  { service.description ? <Typography.Text type='secondary'>{service.description}</Typography.Text> : null }
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesSection