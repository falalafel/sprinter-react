import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import SprinterAppBar from './SprinterAppBar';
import AddProject from './AddProject';
import CloseSprint from './CloseSprint';
import CloseProject from './CloseProject';
import Overview from './Overview';
import DeclareHours from './DeclareHours';
import history from '../history';

class App extends React.Component {
    render() {
        return (

            <Router history={history}>
                <Route strict path='/' component={SprinterAppBar}/>
                <Route exact strict path='/overview/:projectId?/:sprintId?/' component={Overview}/>
                <Route exact strict path='/new-project/' component={AddProject}/>
                <Route exact strict path='/declare-hours/:projectid/:sprintid/' component={DeclareHours}/>
                <Route exact strict path='/close-sprint/:projectid/:sprintid/' component={CloseSprint}/>
                <Route exact strict path='/close-project/:projectid/' component={CloseProject}/>
            </Router>
        );
    }
}

export default App;
