import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Dashboard from './Dashboard'
import Home from './Home';
import ProjectMembersCreate from "./ProjectMembersCreate";
import MotherComponent12 from "./MotherComponent12";

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/dupa' component={ProjectMembersCreate}/>
          <Route path='/xd' component={MotherComponent12}/>
        </Switch>
    );
  }
}

export default App;
