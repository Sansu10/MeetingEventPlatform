import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalenderView.css';

const locales = {
  'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const [events] = useState([
    {
      title: 'Meeting-2',
      start: new Date(2024, 1, 25, 10, 0), // Year, Month(0-11), Day, Hours, Minutes
      end: new Date(2024, 1, 25, 11, 0),
    },
    {
      title: 'Morning',
      start: new Date(2024, 1, 28, 9, 0),
      end: new Date(2024, 1, 28, 12, 0),
    },
    {
      title: 'Meeting-2',
      start: new Date(2024, 1, 28, 14, 0),
      end: new Date(2024, 1, 28, 15, 0),
    }
  ]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="activity">
          <span>Event type</span>
          <span className="arrow">›</span>
        </div>
        <div className="timezone">
          <span>Indian Time Standard</span>
          <span className="arrow">›</span>
        </div>
      </div>

      <div style={{ height: '80vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['day', 'week', 'month']}
          step={30}
          timeslots={2}
        />
      </div>
    </div>
  );
};

export default CalendarView;