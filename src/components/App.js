import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home';
import TestComponent from './TestComponent';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/dupa' component={TestComponent}/>
        </Switch>
    );
  }
}

export default App;
