import React, { Component } from 'react';

class Enroll extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchedValue: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  render(){
    return (
      <div className="App">
        <div className="App-header">
          <h1> Search for a class </h1>
          <div className="ui icon input">
            <input
              type="text"
              placeholder="Search..."
              onChange={this.handleSearchInput}
              onKeyPress={this.onKeyPress}
            />
            <i className="inverted circular search link icon" onClick={this.onSubmit} />
          </div>
          <h1> Search for a class by subject </h1>
        </div>
      </div>
    );
  }
}

export default Enroll;
