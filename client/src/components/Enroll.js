import React, { Component } from 'react';
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
  }

  handleSearchInput = (e) => {
    this.setState({searchedValue: e.target.value});
  }

  onKeyPress = (event) => {
    if(event.key === 'Enter')
      console.log(this.state.searchedValue);
  }

  onSubmit = (event) => {
    console.log(this.state.searchedValue);
  }

  onSubjectClick = (event) => {
    this.setState({subjectSearchValue: event.target.value});
  }

  render(){
    return (
      <div className="top-border">
        <h1 style={{color: 'black', marginTop: '5%'}}> Search for a class </h1>
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
        <div className="ui grid container" style={{marginTop: '1%'}}>
          <div className="four wide column">
            <button style={{width: '200px'}} className="ui button" value="Computer Science" onClick={this.onSubjectClick}>Computer Science</button>
          </div>
          <div className="four wide column">
            <button style={{width: '200px'}} className="ui button" value="English" onClick={this.onSubjectClick}>English</button>
          </div>
          <div className="four wide column">
            <button style={{width: '200px'}} className="ui button" value="Bio" onClick={this.onSubjectClick}>Bio</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Enroll;
