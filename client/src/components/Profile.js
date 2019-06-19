import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Class from './Class';
import '../styles/profile.css';

class Profile extends Component {
  constructor(props){
    super(props);

    this.state = {
      userInfo: {}
    }

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout = (event) => {
    localStorage.clear();
    window.location.replace('/');
  }

  render(){
    return(
      <div className="top-border">
        <h1 style={{marginTop: '5%'}}> {this.props.user.firstName} {this.props.user.lastName}'s Profile</h1>
        <button className="ui button" onClick={this.onLogout}>Logout</button>
        <h1> Your Classes </h1>
        <div className="ui grid container">
          <Class />
        </div>
        <Link to='/schedule'>
          <button className="ui button" style={{marginTop: '2%'}}> View Full Schedule </button>
        </Link>
      </div>
    );
  }
}

export default Profile;
