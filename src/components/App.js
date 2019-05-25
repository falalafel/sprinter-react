import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import Overview from './Overview';
import SignIn from "./SignIn";
import ProtectedRoute from "./ProtectedRoute";


class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact strict path='/sign-in' component={SignIn}/>
                    {/* <SprinterAppBar /> */}
                    {/* <ProtectedRoute strict path='/' component={SprinterAppBar}/> */}

                    
                    <Route exact strict path='*' render={() => "hcujek 404"} />
                </Switch>

                <Route exact strict path='/overview' component={Overview}/>
                    <Route exact strict path='/new-project' component={AddProject}/>
                    <Route exact strict path='/manage-project/projectId=:projectid'/>  {/*TODO: component={ManageProject}/>*/}

            </div>
        );
    }
}

export default App;
