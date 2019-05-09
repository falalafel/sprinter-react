import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import Typography from '@material-ui/core/Typography/index';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import SimpleSelect from "./SimpleSelect";
import api from "../api";
import styles from "./Dashboard.styles";

function declarationListItem(declaration) {
    return {id: declaration.userId,
        name: declaration.userId,
        calories: declaration.hoursAvailable,
        fat: declaration.workNeeded,
        protein: declaration.comment};
}

function projectListItem(project) {
    return {id: project.projectId, label: project.name}
}

function sprintListItem(sprint) {
    return {id: sprint.sprintId, label: sprint.sprintId}
}


class Dashboard extends React.Component {
    state = {
        open: true,
        activeProjectId: null,
        activeSprintId: null,
        projects: [],
        sprints: [],
        declarations: [],
    };

    fetchAndSetProjects() {
        api.fetch(
            api.endpoints.getProjects().path,
            (response) => {
                this.setState({projects: response})
            });
    }

    fetchAndSetSprint() {
        api.fetch(
            api.endpoints.getSprints(this.state.activeProjectId).path,
            (response) => {
                this.setState({sprints: response})
            });
    }

    fetchAndSetDeclarations() {
        api.fetch(
            api.endpoints.getDeclarations(this.state.activeProjectId, this.state.activeSprintId).path,
            (response) => {
                this.setState({declarations: response})
            });
    }

    setActiveProject = (projectId) => {
        this.setState({activeProjectId: projectId})
    };

    setActiveSprint = (sprintId) => {
        this.setState({activeSprintId: sprintId})
    };

    componentDidMount() {
        this.fetchAndSetProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.activeProjectId !== prevState.activeProjectId) {
            this.fetchAndSetSprint()
        } else if(this.state.activeSprintId !== prevState.activeSprintId) {
            this.fetchAndSetDeclarations()
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Typography variant="h5" gutterBottom component="h2">
                        Projects Overview
                    </Typography>
                    <SimpleSelect
                        label={'project'}
                        itemListCallback={this.setActiveProject}
                        itemList={this.state.projects.map(item => projectListItem(item))}/>
                    <Typography variant="h5" gutterBottom component="h2">
                        Sprints Overview
                    </Typography>
                    <SimpleSelect
                        label={'sprint'}
                        itemListCallback={this.setActiveSprint}
                        itemList={this.state.sprints.map(item => sprintListItem(item))}/>
                    <Typography variant="h4" gutterBottom component="h2">
                        Reported hours
                    </Typography>
                    <div className={classes.tableContainer}>
                        <SimpleTable data={this.state.declarations.map(item => declarationListItem(item))}/>
                    </div>
                    <Typography variant="h4" gutterBottom component="h2">
                        Factor chart
                    </Typography>
                    <Typography component="div" className={classes.chartContainer}>
                        <SimpleLineChart/>
                    </Typography>
                </main>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);