import React from 'react';
import Calendar from './Calendar';
import '../styles/App.css';

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{color: 'black'}}> Already Better than CunyFirst </h1>
        <Calendar />
      </header>
    </div>
  );
}

export default Home;
