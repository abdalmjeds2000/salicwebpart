import { Divider } from "antd";
import React from "react";


const Section = (props) => {
  const AssigneeRecordsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  }
  return (
    <div>
        <Divider orientation="left" orientationMargin="0">
          {props.SectionTitle}
        </Divider>
        <div style={AssigneeRecordsStyle}>
          {props.children}
        </div>
    </div>
  )
}

export default Section