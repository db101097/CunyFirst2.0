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
        <div class="ui secondary  menu">
          <div className="cunyimage" >
            <img className="ui small image" src={logo} alt="CUNYFirst" />
          </div>
          <div class="right menu">
            <a class="ui item" style={{marginTop: '-20%', color: 'white', fontSize: '17px'}} onClick={this.onLogout}>
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
