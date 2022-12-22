import React, { useContext, useEffect, useState } from 'react';
import { AppCtx } from '../../../App';
import './Calendar.css';

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import momentPlugin from "@fullcalendar/moment";

const Calendar = () => {
  const { user_data, sp_context } = useContext(AppCtx);


  const events = [
    {title: 'teest', start: new Date(), end: new Date(), },
    {title: 'teest 22+', start: new Date(), end: new Date(), }
  ];

  useEffect(() => {
    let x = document.getElementsByClassName('fc-view-harness');
    x[0].style.minHeight = '480px';
  }, [])

  return (
    <div className='my-team_calendar-container'>
      <FullCalendar
        expandRows
        events={events}
        themeSystem="Slate"
        headerToolbar={{
          start: "prev,next today",
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay'
          // end: "dayGridMonth dayGridWeek dayGridDay",
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
      />
    </div>
  )
}

export default Calendar