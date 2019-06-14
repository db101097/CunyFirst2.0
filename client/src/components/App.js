import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import '../styles/App.css';

class App extends Component {
  render(){
    return(
      <Router>
        <div className="App">
          <Route path ="/" exact render = {
            () => {
              return (<Home />);
            }
          }/>
        </div>
      </Router>
    );
  }
}

export default App;
