import React, { Component } from 'react';

class Enroll extends Component {
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <h1> Search for a class </h1>
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search icon" />
          </div>
          <h1> Search for a class by subject </h1>
        </div>
      </div>
    );
  }
}

export default Enroll;
