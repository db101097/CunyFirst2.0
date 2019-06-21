import React, { Component } from 'react';
import { loginThunk } from '../thunks';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../images/cst2.png';
import '../styles/register.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);  // when user presses enter to submit
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  handleEmailInput = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordInput = (e) => {
    this.setState({password: e.target.value});
  }

  handleLogin = (event) => {
    this.props.login(this.state);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.login(this.state);
    }
  }

  handleHomeClick = (event) => {
    window.location.replace('/');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="ui medium image" src={logo} alt="logo" style={{marginBottom: '1%'}}/>
          <div style={{width: '25%'}}>
            <div className="ui middle aligned center aligned grid">
              <div className="column">
                <h2 className="ui black image header">
                  <div className="content">
                    Log in to Your Account
                  </div>
                </h2>
                <form className="ui large form" onKeyPress={this.handleKeyPress}>
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="at icon"></i>
                        <input
                          type="text"
                          name="Email"
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
                    <Link to='/login'>
                      <button className="ui fluid large submit button" onClick={this.handleLogin}>Login</button>
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
    login: (info) => dispatch(loginThunk(info))
  }
}

export default connect(null, mapDispatchToProps)(Login);
