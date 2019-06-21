import React from 'react';
import logo from '../images/CSt.png';
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
          <h1 style={{color: 'black', fontSize: '275%', marginBottom: '-1%'}}> Welcome to </h1>
          <img src={logo} alt="CUNYSecond" style={{width: '32.5%', marginTop: '0%', marginBottom: '0%'}}/>
        </div>
        <div className="ui fluid large submit button" onClick={onLogin} style={{ backgroundColor: '#FDDD6E', width: '30%', marginBottom: '1%' }}> Login </div>
        <div className="ui fluid large submit button" onClick={onRegister} style={{ backgroundColor: '#FDDD6E', width: '30%' }}> Register </div>
      </header>
    </div>
  );
}

export default Home;
