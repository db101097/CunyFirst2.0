import React, { Component } from 'react';
import { searchThunk } from '../thunks';
import { connect } from 'react-redux';
import Class from './Class';
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
    if(event.key === 'Enter'){
      console.log(this.state.searchedValue);
      this.props.search(this.state.searchedValue);
    }
  }

  onSubmit = (event) => {
    console.log(this.state.searchedValue);
    this.props.search(this.state.searchedValue);
  }

  onSubjectClick = (event) => {
    console.log(this.state.subjectSearchValue);
    this.props.search(this.state.subjectSearchValue);
  }

  onLogout = (event) => {
    localStorage.clear();
    window.location.replace('/');
  }

  render(){
    let table = [];
    let results = this.props.results;

    for(let i = 0; i < results.length; i++){
      let currClass = results[i];
      let time = currClass.startTime + '-' + currClass.endTime;
      let days = currClass.days[0] + ' and ' + currClass.days[1];
      table.push(
                  <Class
                    search={true}
                    classId={currClass.classId}
                    name={currClass.name}
                    title={currClass.title}
                    time={time}
                    days={days}
                    instructor={currClass.instructor}
                    room={currClass.room}
                  />
                );
    }

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
          <option value="CSCI">Computer Science</option>
          <option value="Eng">English</option>
          <option value="Bio">Biology</option>
        </select>
        <button className="ui button" onClick={this.onSubjectClick} style={{marginLeft: '2.5%'}}>
          <i className="search icon" />
          Search
        </button>
        <div className="ui grid container" style={{marginTop: '1%'}}>
          {table}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    results: state.getClasses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search:(term) => dispatch(searchThunk(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enroll);
