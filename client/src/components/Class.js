import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Class extends Component {
  render(){
    if(this.props.placeholder === true){
      return(
        <div className="four wide column">
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="ui placeholder">
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
              <div className="ui green bottom attached button">
                <Link to='/enroll' style={{color: 'white'}}>
                  <i className="plus icon" /> Add
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if(this.props.search === false){
      return(
        <div className="four wide column">
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">
                  {this.props.name}
                </div>
                <div className="meta">
                  {this.props.title}
                </div>
                <div className="description">
                  Scheduled Time: {this.props.time}
                  Scheduled Day(s):
                  Instructor: {this.props.instructor}
                  Room: {this.props.room}
                </div>
              </div>
              <div className="ui red bottom attached button">
                Drop
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.search === true) {
      return(
        <div className="four wide column">
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">
                  {this.props.name}
                </div>
                <div className="meta">
                  {this.props.title}
                </div>
                <div className="description">
                  Scheduled Time: <br /> {this.props.time} <br />
                  Scheduled Day(s): <br /> {this.props.days} <br />
                  Instructor: {this.props.instructor} <br />
                  Room: {this.props.room}
                </div>
              </div>
              <div className="ui green bottom attached button">
                <i className="plus icon" />Select
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Class;
