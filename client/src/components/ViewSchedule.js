import React, { Component } from 'react';
import Calendar from './Calendar';
import logo from '../images/cfirst.gif';
import html2canvas from 'html2canvas';
import axios from 'axios';

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
            <button type="button" onClick={this.printDocument}>PDF</button>
          </div>
        </div>
        <div className='App'>
          <div id='sus' className="App-header">
            <Calendar />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSchedule;
