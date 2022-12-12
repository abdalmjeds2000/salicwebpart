import React, { useEffect, useState } from 'react';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-hijri';
import { Modal, Table, Tooltip } from 'antd';
moment.locale('ar')



function calcTime(offset) {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + (3600000*offset));

  // return time as a string
  return `${nd.toLocaleString()}`;
}



const ClockComponent = (props) => {
  const [cTime, setTime] = useState(new Date().toUTCString().slice(0, 16) + ' ' + new Date().toLocaleTimeString());
  const [openModal, setOpenModal] = useState(false);

  var arMoment = moment().format('iYYYY/iM/iDهـ ');
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toUTCString().slice(0, 16) + ' ' + new Date().toLocaleTimeString());
    }, 1000);
  });



  const columns = [
    { title: 'Country', dataIndex: 'Country', width: '25%' },
    { title: 'Timezone', dataIndex: 'Timezone', width: '25%' },
    { title: 'Time', dataIndex: 'Time', width: '50%' },
  ];

  const data = [
    {
      Country: 'Saudi Arabia',
      Timezone: 'UTC +03:00',
      Time: calcTime('+3'),
    },{
      Country: 'India',
      Timezone: 'UTC +05:30',
      Time: calcTime('+5'),
    },{
      Country: 'Ukrania',
      Timezone: 'UTC +02:00',
      Time: calcTime('+2'),
    },{
      Country: 'United Kingdom',
      Timezone: 'UTC +00:00',
      Time: calcTime('+0'),
    },{
      Country: 'Canada',
      Timezone: 'UTC -04:00',
      Time: calcTime('-4'),
    },{
      Country: 'Australia',
      Timezone: 'UTC +11:00',
      Time: calcTime('+11'),
    },
  ]
  return (
    <>
      <Tooltip title="Date & Time" placement='bottom'>
        <div className='app-clock' onClick={() => setOpenModal(true)} style={{display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--main-color)', opacity: '0.6', cursor: 'pointer'}}>

          <FontAwesomeIcon 
            icon={faCalendarDays} 
            style={{fontSize: props.EnableHijri ? '1.2rem' : '1rem'}} 
          />

          <div style={{fontWeight: '500', fontSize: '0.8rem'}}>
            <span style={{display: 'block', lineHeight: '1.1'}}>{cTime}</span>
            {props.EnableHijri ? <span style={{display: 'block', lineHeight: '1.1'}}>{arMoment}</span> : null}
          </div>
        </div>
      </Tooltip>

      <Modal
        title="Time & Date"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        okButtonProps={{ style: {display: 'none'}}}
        // className="more-width-antd-modal"
        >
        <div style={{overflowX: 'auto'}}>
          <Table
            columns={columns} 
            dataSource={data}
            pagination={false}
          />
        </div>
      </Modal>
    </>
  )
}

export default ClockComponent