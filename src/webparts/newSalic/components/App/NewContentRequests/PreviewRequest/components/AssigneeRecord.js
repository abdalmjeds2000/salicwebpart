import React from 'react'

function AssigneeRecord(props) {
  const recordStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    gap: '7px'
  }
  const imgStyle = {
    width: "30px",
    borderRadius: "50%",
  }
  const textStyle = {
    color: '#000 !important',
    fontSize: '1rem',
    lineHeight: '1.1'
  }
  return (
    <div style={recordStyle}>
      <img src='https://salic.sharepoint.com/sites/newsalic/_layouts/15/userphoto.aspx?size=s&username=' alt='' style={imgStyle} />
      <div style={textStyle}>
        {props.AssignFrom} {'>'} <b>{props.AssignTo}</b> - {props.AssignDate}
      </div>
    </div>
  )
}

export default AssigneeRecord