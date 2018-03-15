import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="AppHeader">
          <h1>City Gallery</h1>
        </div>

        <div className="AppNav">
          London<br />
          Paris<br />
          Tokyo<br />
        </div>

        <div className="AppContent">
          <h1>London</h1>
          <p>
            London is the capital city of England. It is the most populous city in the United Kingdom,
            with a metropolitan area of over 13 million inhabitants.
          </p>
          <p>
            Standing on the River Thames, London has been a major settlement for two millennia,
            its history going back to its founding by the Romans, who named it Londinium.
          </p>
        </div>

        <div className="AppFooter">
          Copyright W3School.com.cn
        </div>
      </div>
    );
  }
}

export default App;
