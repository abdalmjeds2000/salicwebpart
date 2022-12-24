import { Typography } from 'antd';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppCtx } from '../../../App';
import './Calendar.css';


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import momentPlugin from "@fullcalendar/moment";
import AntdLoader from '../../../Global/AntdLoader/AntdLoader';



let CancelToken = axios.CancelToken;


const Calendar = () => {
  const { user_data } = useContext(AppCtx);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const mappingEvents = events.map(e => {
    return {
      title: e.subject,
      start: e.start.dateTime,
      end: e.end.dateTime,
      url: e.webLink
    }
  });



  let cancel;
  const fetchEventsData = async (email, sDate, eDate) => {
    if(cancel) { cancel(); }
    await axios.get(
      `https://salicapi.com/api/user/calendar?Email=${email}&Start=${sDate}&End=${eDate}`,
      { cancelToken: new CancelToken(c => cancel = c) }
    )
    .then(({ data }) => setEvents(data.value || []))
    .catch(err => console.log(err))
  }
  // obj: {start, end, startStr, endStr, timeZone, view}
  const handleChangeDate = (obj) => {
    let startDate = obj.startStr.split("T")[0];
    let endDate = obj.endStr.split("T")[0];
    fetchEventsData(user_data?.Data?.Mail, startDate, endDate);
  }



  // let x = document.getElementsByClassName('fc-view-harness');
  // if(x.length > 0) {
  //   x[0]?.style?.minHeight = '480px';
  // }

  if(Object.keys(user_data).length === 0) {
    return <></>;
  }

  return (
    events.length > 0 
    ? (
      <div className='my-team_calendar-container'>
        <FullCalendar
          expandRows
          events={mappingEvents}
          themeSystem="Slate"
          headerToolbar={{
            start: "prev,next today",
            center: 'title',
            end: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
          plugins={[
            momentPlugin,
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin
          ]}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          }}
          views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
          datesSet={obj => handleChangeDate(obj)}
          eventContent={renderEventContent}
          height={300}
        />
      </div>
    ) : null
  )
}

export default Calendar;


const renderEventContent = (eventInfo) => {
  return (
    <div>
      <Typography.Text type='secondary'>{eventInfo.timeText}</Typography.Text><br />
      <Typography.Link 
        style={{}}
        href={eventInfo.event.url} 
        target="_blank" 
        rel="noreferrer"
      >
        {eventInfo.event.title}</Typography.Link>
    </div>
  );
};

