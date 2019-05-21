import React from 'react';
import {Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import CloseSprint from './CloseSprint';
import Overview from './Overview';
import DeclareHours from './DeclareHours';

class App extends React.Component {
    render() {
        return (

            <Router>
                <Route strict path='/' component={SprinterAppBar}/>
                <Route exact strict path='/overview' component={Overview}/>
                <Route exact strict path='/new-project' component={AddProject}/>
                <Route exact strict path='/declare-hours/project=:projectId/sprint=:sprintId' component={DeclareHours}/>
                <Route exact strict path='/close-sprint/project=:projectId/sprint=:sprintId' component={CloseSprint}/>
                <Route exact strict path='/manage-project/projectId=:projectid'/>  {/*TODO: component={ManageProject}/>*/}
            </Router>
        );
    }
}

export default App;
