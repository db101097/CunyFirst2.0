import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addThunk, deleteThunk } from '../thunks';

class Class extends Component {

  onSelect = (event) => {
    this.props.add(this.props.classId, this.props.studentId)
  }

  onDelete = (event) => {
    let classID = this.props.classId;
    let studentID = this.props.studentId;
    this.props.delete(classID, studentID);
  }

  render(){
    if(this.props.placeholder === true){
      return(
        <div className="four wide column">
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">
                  <div className="ui placeholder">
                    <div className="line"></div>
                  </div>
                </div>
                <div className="meta">
                  <div className="ui placeholder">
                    <div className="line"></div>
                  </div>
                </div>
                <div className="description">
                  <div className="ui placeholder">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
              </div>
              <Link to='/enroll' style={{color: 'white'}}>
                <div className="ui green bottom attached button">
                  <i className="plus icon" /> Add
                </div>
              </Link>
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
                  Scheduled Time: <br /> {this.props.time} <br />
                  Scheduled Day(s): <br /> {this.props.days} <br />
                  Instructor: {this.props.instructor} <br />
                  Room: {this.props.room}
                </div>
              </div>
              <div className="ui red bottom attached button" onClick={this.onDelete}>
                <i className="trash icon" /> Drop
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
              <div className="ui green bottom attached button" onClick={this.onSelect}>
                <i className="plus icon" />Select
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    studentId: state.user.currentUser.studentId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    add:(classID, studentID) => dispatch(addThunk(classID, studentID)),
    delete:(classID, studentID) => dispatch(deleteThunk(classID, studentID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Class);
