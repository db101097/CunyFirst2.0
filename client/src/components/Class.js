import React from 'react';
import { Link } from 'react-router-dom';

const Class = () => {
  return(
    <div className="five column wide">
      <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">
              Class Name
            </div>
            <div className="meta">
              Class Subject
            </div>
            <div className="description">
              Scheduled Time
            </div>
          </div>
          <div className="ui red bottom attached button">
            Drop
          </div>
        </div>
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

export default Class;
