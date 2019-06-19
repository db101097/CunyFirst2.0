import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { revisitThunk } from '../thunks';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Schedule from './ViewSchedule';
import Enroll from './Enroll';
import '../styles/App.css';

class App extends Component {
  componentDidMount(){
    this.props.revisit();
  }

  render(){
    if (localStorage.token !== undefined && Math.floor(Date.now()/1000) < localStorage.exp){
      return(
        <Router>
          <div className="App">
            <Route path ="/" exact render = {
              () => {
                return (<Profile user={this.props.currentUser}/>);
              }
            }/>
            <Route path ="/schedule" exact render = {
              () => {
                return (<Schedule />);
              }
            }/>
            <Route path ="/enroll" exact render = {
              () => {
                return (<Enroll />);
              }
            }/>
          </div>
        </Router>
      );
    } else {
      return(
        <Router>
          <div className="App">
            <Route path ="/" exact render = {
              () => {
                return (<Home />);
              }
            }/>
            <Route path ="/login" exact render = {
              () => {
                return (<Login />);
              }
            }/>
            <Route path ="/register" exact render = {
              () => {
                return (<Register />);
              }
            }/>
          </div>
        </Router>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    revisit:() => dispatch(revisitThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
