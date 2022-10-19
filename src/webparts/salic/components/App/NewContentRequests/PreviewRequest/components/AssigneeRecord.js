import { CalendarOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Avatar, Image } from 'antd'
import React from 'react'

function AssigneeRecord(props) {
  const recordStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    gap: '5px',
    padding: '5px',
    borderRadius: '3px',
    border: '1px solid #eee',
    backgroundColor: '#f8f8f8'
  }
  const imgStyle = {
    width: "35px",
    borderRadius: "50%",
    border: '2px solid #fff'
  }
  const nameStyle = {
    color: '#000 !important',
    display: 'block',
    fontSize: '1rem',
    lineHeight: '1.7'
  }
  const dateStyle = {
    display: 'block',
    fontSize: '0.8rem',
    lineHeight: '1.7',
    color: '#949494'
  }
  return (
    <div style={recordStyle}>
      <Avatar
        src={
          <Image
            src={`https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=${props.RequesterEmail}`}
            style={{width: 32}}
          />
        }
      />
      <div>
        <span style={nameStyle}>{props.RequesterName} <CaretRightOutlined /> <b>{props.AssignTo}</b></span>
        <span style={dateStyle}><CalendarOutlined /> {props.AssignDate}</span>
      </div>
    </div>
  )
}

export default AssigneeRecord