import React, { Component } from 'react';
import axios from 'axios';
import { registerThunk } from '../thunks';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../images/cunySecondBig.png';
import '../styles/register.css';

class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      major: ""
    }

    this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
    this.handleLastNameInput = this.handleLastNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.handleMajorInput = this.handleMajorInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

    axios.defaults.withCredentials = true
  }

  handleFirstNameInput = (e) => {
     this.setState({firstName: e.target.value});
  }

  handleLastNameInput = (e) => {
     this.setState({lastName: e.target.value});
  }

  handleEmailInput = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  }

  handlePasswordConfirm = (e) => {
    this.setState({passwordConfirm: e.target.value});
  }

  handleMajorInput = (e) => {
    this.setState({major: e.target.value});
  }

  handleHomeClick = (event) => {
    window.location.replace('/');
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.register(this.state);
    }
  }

  handleSignUp = (event) => {
    this.props.register(this.state);
  }

  render(){
    return(
      <div className="App">
        <div className="App-header">
          <img
            className="ui medium image"
            src={logo}
            alt="logo"
            style={{marginTop: '-2.5%', marginBottom: '-1%'}}
          />
          <div style={{width: '25%'}}>
            <div className="ui middle aligned center aligned grid">
              <div className="column">
                <h2 className="ui black image header">
                  <div className="content">
                    Register Your Account
                  </div>
                </h2>
                <form className="ui large form" onKeyPress={this.handleKeyPress}>
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          onChange={this.handleFirstNameInput}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          onChange={this.handleLastNameInput}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="at icon"></i>
                        <input
                          type="text"
                          name="email"
                          placeholder="Email"
                          onChange={this.handleEmailInput}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={this.handlePasswordInput}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input
                          type="password"
                          name="passwordConfirm"
                          placeholder="Confirm Password"
                          onChange={this.handlePasswordConfirm}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="book icon"></i>
                        <input
                          type="text"
                          name="major"
                          placeholder="Major"
                          onChange={this.handleMajorInput}
                        />
                      </div>
                    </div>
                    <Link to='/register'>
                      <button
                        className="ui fluid large submit button"
                        onClick={this.handleSignUp}
                      >
                        Register
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <button
              className="ui fluid large submit button"
              style={{marginTop: '2%'}}
              onClick={this.handleHomeClick}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (info) => dispatch(registerThunk(info))
  }
}

export default connect(null, mapDispatchToProps)(Register);
