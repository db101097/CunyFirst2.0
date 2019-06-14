import React, {Component} from 'react';
import Calendar from 'react-big-calendar';
import Views from 'react-big-calendar';
import moment from 'moment';
import "../styles/App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = Calendar.momentLocalizer(moment) // or globalizeLocalizer
let date = new Date('June 14, 2019 14:10:00');
let date2 = new Date('June 14, 2019 15:25:00');
let date3 = new Date('June 14, 2019 17:10:00');
let date4 = new Date('June 14, 2019 19:10:00');


class MyCalendar extends Component {
  state = {
    events: [
      {
        id: 1,
        title: 'CSCI 499',
        start: date,
        end: date2
      },
      {
        id: 2,
        title: 'CSCI 393',
        start: date3,
        end: date4
      }
    ]
  };
  render(){
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={this.state.events}
          step={15}
          timeslots={8}
          style={{ height: "70vh", width: '800px', fontSize: '9.95px', color: 'black' }}
          defaultView={Views.WEEK}
          defaultDate={new Date()}
        />
      </div>
    );
  }
}

export default MyCalendar;
