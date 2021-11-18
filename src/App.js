import React, { Component } from 'react';
import './App.css';
import Employees from './components/Employees/Employees.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <Employees />
      </div>
    );
  }
}
