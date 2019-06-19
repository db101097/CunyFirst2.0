import React, { Component } from 'react';
import Calendar from './Calendar';
import logo from '../images/cfirst.gif';

class ViewSchedule extends Component {
  onLogout = (event) => {
    localStorage.clear();
    window.location.replace('/');
  }

  render(){
    return(
      <div className="top-border">
        <div className="ui secondary  menu">
          <div className="cunyimage" >
            <img className="ui small image" src={logo} alt="CUNYFirst" />
          </div>
          <div className="right menu">
            <a className="ui item" style={{marginTop: '-20%', color: 'white', fontSize: '17px'}} onClick={this.onLogout} href='/'>
              Logout
            </a>
          </div>
        </div>
        <div className='App'>
          <div className="App-header">
            <Calendar />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSchedule;
