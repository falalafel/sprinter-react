import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import Overview from './Overview';
import SignIn from "./SignIn";
import ConfigureProject from "./ConfigureProject";
import ProtectedRoute from "./ProtectedRoute";


const Sprinter = (props) => {
    return (
        <div>
            <SprinterAppBar history={props.history}/>

            <Switch>
                <ProtectedRoute exact strict path='/overview' component={Overview}/>
                <ProtectedRoute exact strict path='/new-project' component={AddProject}/>
                <ProtectedRoute exact strict path='/project-configuration/project=:projectId' component={ConfigureProject}/> {/*TODO: component={ManageProject}/>*/}
                <Route exact strict path='*' render={() => "Page not found: 404"}/>
            </Switch>
        </div>
    );
};

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact strict path='/sign-in' component={SignIn}/>
                    <Route exact strict path='/sign-up' component={SignIn}/> {/* TODO add proper component */}
                    <Route strict path='/' component={Sprinter}/>
                </Switch>
            </div>
        );
    }
}

export default App;
