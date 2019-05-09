import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Home from './Home';
import ProjectMembersCreate from "./ProjectMembersCreate";
import MotherComponent12 from "./MotherComponent12";
import SprinterAppBar from './SprinterAppBar';


class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/dashboard' component={SprinterAppBar}/>
        </Switch>
    );
  }
}

export default App;
