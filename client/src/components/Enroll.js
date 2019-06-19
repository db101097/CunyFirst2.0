import React, { Component } from 'react';
import logo from '../images/cfirst.gif';
import '../styles/enroll.css'

class Enroll extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchedValue: '',
      subjectSearchValue: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubjectClick = this.onSubjectClick.bind(this);
    this.handleSubjectClick = this.handleSubjectClick.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  handleSearchInput = (e) => {
    this.setState({searchedValue: e.target.value});
  }

  handleSubjectClick = (e) => {
    this.setState({subjectSearchValue: e.target.value});
  }

  onKeyPress = (event) => {
    if(event.key === 'Enter')
      console.log(this.state.searchedValue);
  }

  onSubmit = (event) => {
    console.log(this.state.searchedValue);
  }

  onSubjectClick = (event) => {
    console.log(this.state.subjectSearchValue);
  }

  onLogout = (event) => {
    localStorage.clear();
    window.location.replace('/');
  }

  render(){
    return (
      <div className="top-border">
        <div className="ui secondary  menu">
          <div className="cunyimage" >
            <img className="ui small image" src={logo} alt="CUNYFirst" />
          </div>
          <div className="right menu">
            <a className="ui item" style={{marginTop: '-20%', color: 'white', fontSize: '17px'}} onClick={this.onLogout} href='/' >
              Logout
            </a>
          </div>
        </div>
        <h1 style={{color: 'black'}}> Search for a class </h1>
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search..."
            onChange={this.handleSearchInput}
            onKeyPress={this.onKeyPress}
          />
          <i className="inverted circular search link icon" onClick={this.onSubmit} />
        </div>
        <h1 style={{color: 'black'}}> Search for a class by subject </h1>
        <select className="ui dropdown"
                value={this.state.subjectSearchValue}
                onChange={this.handleSubjectClick}
                style={{ borderRadius: '5px'}}>
          <option value="" style= {{color: 'grey'}}>Select Subject</option>
          <option value="Computer Science">Computer Science</option>
          <option value="English">English</option>
          <option value="Biology">Biology</option>
        </select>
        <button className="ui button" onClick={this.onSubjectClick} style={{marginLeft: '2.5%'}}>
          <i className="search icon" />
          Search
        </button>
      </div>
    );
  }
}

export default Enroll;
