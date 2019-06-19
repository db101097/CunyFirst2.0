import React from 'react';
import logo from '../images/cfirst.gif';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Home = () => {
  function onLogin(event){
    window.location.replace('/login');
  }

  function onRegister(event){
    window.location.replace('/register');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{flexDirection: 'row', width: '100%'}}>
          <h1 style={{color: 'black', fontSize: '275%'}}> Welcome to </h1>
          <img src={logo} alt="CUNYFirst" style={{width: '17.5%', marginTop: '-1%', marginBottom: '-1.5%'}}/>
        </div>
        <div className="ui fluid large submit button" onClick={onLogin} style={{ backgroundColor: '#FD8317', width: '30%', marginBottom: '1%' }}> Login </div>
        <div className="ui fluid large submit button" onClick={onRegister} style={{ backgroundColor: '#FD8317', width: '30%' }}> Register </div>
      </header>
    </div>
  );
}

export default Home;
