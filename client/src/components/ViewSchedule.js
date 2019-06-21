import React, { Component } from 'react';
import Calendar from './Calendar';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { getScheduleThunk } from '../thunks';
import { connect } from 'react-redux';
import decode from 'jwt-decode'
import logo from '../images/cunySecondSmall.png';

class ViewSchedule extends Component {
  onLogout = (event) => {
    localStorage.clear();
    window.location.replace('/');
  }

printDocument() {
   const input = document.getElementById('sus');
   html2canvas(input)
     .then((canvas) => {
       const imgData = canvas.toDataURL('image/png');
        axios.post('http://localhost:8080/exportSchedule', {
                img:imgData,
                email:'db101097@gmail.com'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
     })
   ;
 }
  onProfile = (event) => {
    window.location.replace('/');
  }

  componentDidMount(){
    let decoded = decode(localStorage.token);
    this.props.getSchedule(decoded.data.studentId);
  }

  render(){
    let table = [];
    let schedule = this.props.schedule;
    if(schedule !== undefined){
      for(let i = 0; i < schedule.length; i++){
        let dayOne = {};
        let dayTwo = {};
        switch (schedule[i].class.meetInfo.days[0]) {
          case 'Monday':
            dayOne = {
              title: schedule[i].class.title,
              start: new Date('2019-06-17T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-17T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Tuesday':
            dayOne = {
              title: schedule[i].class.title,
              start: new Date('2019-06-18T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-18T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Wednesday':
            dayOne = {
              title: schedule[i].class.title,
              start: new Date('2019-06-19T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-19T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Thursday':
            dayOne = {
              title: schedule[i].class.title,
              start: new Date('2019-06-20T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-20T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Friday':
            dayOne = {
              title: schedule[i].class.title,
              start: new Date('2019-06-21T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-21T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          default:
            break;
        }

        switch (schedule[i].class.meetInfo.days[1]) {
          case 'Monday':
            dayTwo = {
              title: schedule[i].class.title,
              start: new Date('2019-06-17T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-17T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Tuesday':
            dayTwo = {
              title: schedule[i].class.title,
              start: new Date('2019-06-18T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-18T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Wednesday':
            dayTwo = {
              title: schedule[i].class.title,
              start: new Date('2019-06-19T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-19T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Thursday':
            dayTwo = {
              title: schedule[i].class.title,
              start: new Date('2019-06-20T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-20T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          case 'Friday':
            dayTwo = {
              title: schedule[i].class.title,
              start: new Date('2019-06-21T' + schedule[i].class.meetInfo.startTime),
              end: new Date('2019-06-21T' + schedule[i].class.meetInfo.endTime)
            }
            break;
          default:
            break;
        }

        table.push(dayOne);
        table.push(dayTwo)
      }
    }

    return(
      <div className="top-border">
        <div className="ui secondary  menu">
          <div className="cunyimage" >
            <img className="ui small image" src={logo} alt="CUNYFirst" />
          </div>
          <div className="right menu">
            <a className="ui item" style={{marginTop: '-2.5%', color: 'white', fontSize: '17px'}} onClick={this.onProfile} href='/'>
              Profile
            </a>
            <a className="ui item" style={{marginTop: '-2.5%', color: 'white', fontSize: '17px'}} onClick={this.onLogout} href='/'>
              Logout
            </a>
            <button type="button" onClick={this.printDocument}>PDF</button>
          </div>
        </div>
        <h1 style={{marginTop: '2.5%', marginBottom: '-5%'}}>{this.props.user.firstName} {this.props.user.lastName}'s Calender</h1>
        <div className='App'>
          <div id='sus' className="App-header">
            <Calendar events={table}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    schedule: state.getSchedule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSchedule:(id) => dispatch(getScheduleThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSchedule);
