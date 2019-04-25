import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
    );
  }
}

export default App;
