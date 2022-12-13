import React, { useEffect, useState } from 'react';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-hijri';
import { Button, Modal, Table, Tooltip } from 'antd';
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

          {/* <FontAwesomeIcon 
            icon={faCalendarDays} 
            style={{fontSize: props.EnableHijri ? '1.2rem' : '1rem'}} 
          /> */}
          {/* <span className='timezone-icon-span'>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={`${props.EnableHijri ? '25' : '20'}`} height={`${props.EnableHijri ? '25' : '20'}`} x="0" y="0" viewBox="0 0 64 64"><g><path d="m32 62a30 30 0 1 1 30-30 2 2 0 0 1 -4 0 26 26 0 1 0 -26 26 2 2 0 0 1 0 4z" fill="#FFFFFF"  ></path><path d="m55 20h-46a2 2 0 0 1 0-4h46a2 2 0 0 1 0 4z" fill="#FFFFFF"  ></path><path d="m32 34h-28a2 2 0 0 1 0-4h28a2 2 0 0 1 0 4z" fill="#FFFFFF"  ></path><path d="m26 48h-17a2 2 0 0 1 0-4h17a2 2 0 0 1 0 4z" fill="#FFFFFF"  ></path><path d="m32 62c-8.411 0-15-13.178-15-30s6.589-30 15-30c7.229 0 13.271 9.786 14.691 23.8a2 2 0 0 1 -3.98.4c-1.167-11.515-5.773-20.2-10.711-20.2-5.2 0-11 10.678-11 26s5.8 26 11 26a2 2 0 0 1 0 4z" fill="#FFFFFF"  ></path><path d="m46 62a16 16 0 1 1 16-16 16.019 16.019 0 0 1 -16 16zm0-28a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12z" fill="#FFFFFF"  ></path><path d="m43 51a2 2 0 0 1 -1.414-3.414l2.414-2.414v-7.172a2 2 0 0 1 4 0v8a2 2 0 0 1 -.586 1.414l-3 3a1.992 1.992 0 0 1 -1.414.586z" fill="#FFFFFF"  ></path></g></svg>
          </span> */}

          <Button size='small' shape='round'>{/* Subsidiaries  */}Timezone</Button>
          <div style={{fontWeight: '500', fontSize: '0.8rem'}}>
            <span style={{display: 'block', lineHeight: '1.1'}}>{cTime}</span>
            {props.EnableHijri ? <span style={{display: 'block', lineHeight: '1.1'}}>{arMoment}</span> : null}
          </div>
        </div>
      </Tooltip>

      <Modal
        title="Date & Time"
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