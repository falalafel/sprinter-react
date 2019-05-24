import React from 'react';
import {Route} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import Overview from './Overview';
import SignIn from "./SignIn";

class App extends React.Component {
    render() {
        return (
            <div>
                <Route exact strict path='/signin' component={SignIn}/>
                <Route strict path='/' component={SprinterAppBar}/>
                <Route exact strict path='/overview' component={Overview}/>
                <Route exact strict path='/new-project' component={AddProject}/>
                <Route exact strict path='/manage-project/projectId=:projectid'/>  {/*TODO: component={ManageProject}/>*/}
            </div>
        );
    }
}

export default App;
