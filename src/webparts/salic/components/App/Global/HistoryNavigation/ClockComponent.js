import React, { useEffect, useState } from 'react';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-hijri';
moment.locale('ar')

const ClockComponent = (props) => {
  const [cTime, setTime] = useState(new Date().toUTCString().slice(0, 16) + ' ' + new Date().toLocaleTimeString());
  var arMoment = moment().format('iYYYY/iM/iDهـ ');
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toUTCString().slice(0, 16) + ' ' + new Date().toLocaleTimeString());
    }, 1000);
  });

  return (
    <div className='app-clock' style={{display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--main-color)', opacity: '0.6'}}>
      <FontAwesomeIcon icon={faCalendarDays} style={{fontSize: props.EnableHijri ? '1.4rem' : '1rem'}} />
      <div style={{fontWeight: '500'}}>
        <span style={{display: 'block', lineHeight: '1.1'}}>{cTime}</span>
        {props.EnableHijri ? <span style={{display: 'block', lineHeight: '1.1'}}>{arMoment}</span> : null}
      </div>
    </div>
  )
}

export default ClockComponent