import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getScheduleThunk } from '../thunks';
import { connect } from 'react-redux';
import decode from 'jwt-decode'
import Class from './Class';
import logo from '../images/cunySecondSmall.png';
import '../styles/profile.css';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      userInfo: {}
    }

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount(){
    let decoded = decode(localStorage.token);
    this.props.getSchedule(decoded.data.studentId);
  }

  onLogout = (event) => {
    localStorage.clear();
    window.location.replace('/');
  }

  render(){
    let schedule = this.props.schedule;
    let table = [];

    for(let i = 0; i < schedule.length; i++){
      let currClass = schedule[i].class;
      let time = currClass.meetInfo.startTime + '-' + currClass.meetInfo.endTime;
      let days = currClass.meetInfo.days[0] + ' and ' + currClass.meetInfo.days[1];
      table.push(
                  <Class
                    search={false}
                    classId={currClass.meetInfo.classId}
                    name={currClass.name}
                    title={currClass.title}
                    time={time}
                    days={days}
                    instructor={currClass.meetInfo.instructor}
                    room={currClass.meetInfo.room}
                  />
                );
    }

    return(
      <div className="top-border">
        <div className="ui secondary  menu">
          <div className="cunyimage" >
            <img className="ui small image" src={logo} alt="CUNYFirst" />
          </div>
          <div className="right menu">
            <a
              className="ui item"
              style={{marginTop: '-5%', color: 'white', fontSize: '17px'}}
              onClick={this.onLogout}
              href='/'
            >
              Logout
            </a>
          </div>
        </div>
        <h1> {this.props.user.firstName} {this.props.user.lastName}'s Profile</h1>
        <h1 style={{marginTop: '0%'}}> Your Classes </h1>
        <div className="ui grid container" style={{marginTop: '1%'}}>
          {table}
          <Class placeholder={true}/>
        </div>
        <Link to='/schedule'>
          <button
            className="ui button"
            style={{marginTop: '2%', marginBottom: '2%'}}
          >
            View Full Schedule
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.getSchedule
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSchedule:(id) => dispatch(getScheduleThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
