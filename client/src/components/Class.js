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
          <div className="extra content">
            <div className="ui one buttons">
              <div className="ui basic red button">Drop</div>
            </div>
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
          <div className="extra content">
            <div className="ui one buttons">
              <Link to='/enroll'>
                <div className="ui basic green button">
                  <i className="plus icon" />
                  Add
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Class;
