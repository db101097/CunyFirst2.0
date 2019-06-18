import React, { Component } from 'react';

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
      <div>
        <h1>Profile Will Be Here Soon</h1>
        <button className="ui button" onClick={this.onLogout}>log out</button>
        <h1> {this.props.user.firstName} {this.props.user.lastName}'s Profile</h1>
      </div>
    );
  }
}

export default Profile;
