import React, { Component } from 'react';
import './App.css';
// import Employees from './components/Employees/Empoloyees.js';
// import Test from './components/test/Test.js';
import SliderEmployees from './components/SliderEmployees/SliderEmployees.js';

export default class App extends Component {
  render() {
    return (
      <div>
        {/* <Employees /> */}
        {/* <Test /> */}
        <SliderEmployees />
      </div>
    );
  }
}
