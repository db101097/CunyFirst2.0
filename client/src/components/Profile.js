import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Class from './Class';
import logo from '../images/cfirst.gif';
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
        <h1> {this.props.user.firstName} {this.props.user.lastName}'s Profile</h1>
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
