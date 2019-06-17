import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{color: 'black'}}> Already Better than CunyFirst </h1>
        <Link to='/login'>
          <button className="ui button"> Login </button>
        </Link>
        <Link to='/register'>
          <button className="ui button"> Register </button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
