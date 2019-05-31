import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import Overview from './Overview';
import SignIn from "./SignIn";
import ProtectedRoute from "./ProtectedRoute";
import AddUser from './AddUser';

const RootRouter = (props) => {
    return (
        <Route 
            render={props => (
                localStorage.getItem('user')
                    ? <Redirect to={{pathname: "/overview"}}/>
                    : <Redirect to={{pathname: "/sign-in"}}/>
            )}
        />
    );
}

const InnerRouter = (props) => {
    return (
        <div>
            <SprinterAppBar history={props.history}/>

            <Switch>
                <Route exact strict path='/' component={RootRouter} />
                <ProtectedRoute exact strict path='/overview' component={Overview}/>
                <ProtectedRoute exact strict path='/new-project' component={AddProject}/>
                <ProtectedRoute exact strict path='/add-user' component={AddUser}/>
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
                    <Route exact strict path='/sign-up' component={SignIn}/> {/* TODO add proper component */}
                    <Route strict path='/' component={InnerRouter}/>
                </Switch>
            </div>
        );
    }
}

export default App;
