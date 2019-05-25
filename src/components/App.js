import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import Overview from './Overview';
import SignIn from "./SignIn";
import ProtectedRoute from "./ProtectedRoute";
import authentication from "../authentication";


const Sprinter = (props) => {
    return (
        <div>
            <SprinterAppBar history={props.history}/>

            <Switch>
                <ProtectedRoute exact strict path='/overview' component={Overview}/>
                <ProtectedRoute exact strict path='/new-project' component={AddProject}/>
                <ProtectedRoute exact strict path='/manage-project/projectId=:projectid'/> {/*TODO: component={ManageProject}/>*/}
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
                    <Route exact strict path='/log-in' component={SignIn}/>
                    <Route strict path='/' component={Sprinter}/>
                </Switch>
            </div>
        );
    }
}

export default App;
