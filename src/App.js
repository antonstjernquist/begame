import React, { Component } from 'react';
import Router from './router.js';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <span> Begame </span>
        <Router />
      </div>
    );
  }
}

export default App;
