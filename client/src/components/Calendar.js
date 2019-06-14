import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
let date = new Date('June 14, 2019 15:24:00');
let date2 = new Date();

let myEventsList = [
  {
    title: 'something',
    start: date2,
    end: date,
    allDay: false,
    resource: 'Professor Name: '
  }
]

const Calendar = props => {
  return (
    <div>
      <BigCalendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default Calendar;
