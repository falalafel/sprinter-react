import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import SimpleSelect from "./SimpleSelect";
import api from "../api";
import styles from "./Dashboard.styles";
import {Button} from "@material-ui/core";
import {Link} from 'react-router-dom';
import ProjectSelect from "./ProjectSelect";
import SprintSelect from "./SprintSelect";


function declarationListItem(declaration) {
    return {
        id: declaration.userId,
        name: declaration.userId,
        calories: declaration.hoursAvailable,
        fat: declaration.workNeeded,
        protein: declaration.comment
    };
}

function projectListItem(project) {
    return {id: project.projectId, label: project.name}
}

function sprintListItem(sprint) {
    return {id: sprint.sprintId, label: sprint.sprintId}
}

class Overview extends React.Component {

    state = {
        projects: [],
        sprints: [],
        declarations: [],
        projectId: undefined,
        sprintId: undefined,
    };

    fetchAndSetProjects() {
        api.fetch(
            api.endpoints.getProjects(),
            (response) => {
                this.setState({projects: response})
            });
    }

    fetchAndSetSprints(projectId) {
        if (projectId !== undefined)
            api.fetch(
                api.endpoints.getSprints(projectId),
                (response) => {
                    this.setState({sprints: response})
                });
        else
            this.setState({sprints: []})
    }

    fetchAndSetDeclarations(projectId, sprintId) {
        if (projectId !== undefined && sprintId !== undefined)
            api.fetch(
                api.endpoints.getDeclarations(projectId, sprintId),
                (response) => {
                    this.setState({declarations: response})
                });
        else
            this.setState({declarations: []})
    }

    getUrlParams(location) {
        const searchParams = new URLSearchParams(location.search);
        return {
            projectId: parseInt(searchParams.get('project')) || undefined,
            sprintId: parseInt(searchParams.get('sprint')) || undefined,
        };
    }

    handleProjectChange = (projectId) => {
        if (projectId !== this.state.projectId) {
            if (projectId === null) {
                this.props.history.push('/overview')
            } else {
                this.props.history.push(`/overview?project=${projectId}`)
            }
        }
    };

    handleSprintChange = (sprintId) => {
        if (sprintId !== this.state.sprintId) {
            if (sprintId === null) {
                this.props.history.push(`/overview?project=${this.state.projectId}`)
            } else {
                this.props.history.push(`/overview?project=${this.state.projectId}&sprint=${sprintId}`)
            }
        }
    };

    componentDidMount() {
        const {projectId, sprintId} = this.getUrlParams(window.location);

        this.fetchAndSetProjects();
        this.fetchAndSetSprints(projectId);
        this.fetchAndSetDeclarations(projectId, sprintId);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {projectId, sprintId} = this.getUrlParams(window.location);

        if (prevState.projectId !== projectId) {
            this.setState({projectId: projectId})
            this.fetchAndSetSprints(projectId)
        }

        if (prevState.projectId !== projectId || prevState.sprintId !== sprintId) {
            this.setState({sprintId: sprintId})
            this.fetchAndSetDeclarations(projectId, sprintId)
        }
    }

    declareHoursButtonEnabled() {
        const {projects, sprints, projectId, sprintId} = this.state;
        const activeProject = projects.find(p => p.projectId === projectId) || null
        const activeSprint = sprints.find(s => s.sprintId === sprintId) || null

        return activeProject && activeProject.closingStatus === false && activeSprint && activeSprint.closingStatus === false
    }

    newSprintButtonEnabled() {
        // TODO: check scrum master permissions
        const {projects, projectId} = this.state;
        const activeProject = projects.find(p => p.projectId === projectId) || null
        
        return activeProject && activeProject.closingStatus === false
    }

    closeSprintButtonEnabled() {
        // TODO: check scrum master permissions
        return this.declareHoursButtonEnabled()
    }

    editProjectButtonEnabled() {
        // TODO: check scrum master permissions
        const {projects, projectId} = this.state;
        const activeProject = projects.find(p => p.projectId === projectId) || null
        
        return activeProject
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer}/>

                    <div className={classes.selection} >
                        <div className={classes.projectSelection}>
                        <Typography variant="h6" component="h2">
                            Project
                        </Typography>
                        <ProjectSelect
                            projects={this.state.projects.map(p => ({
                                id: p.projectId,
                                name: p.name,
                                isOpen: !p.closingStatus,
                                startDate: p.startDate,
                            }))}
                            projectChangeCallback = {this.handleProjectChange}
                            selectedProjectId = {this.state.projectId}
                        />
                        </div>

                        <div className={classes.sprintSelection}>
                            <Typography variant="h6" component="h2">
                                Sprint
                            </Typography>
                            <SprintSelect
                                sprints={this.state.sprints.map(s => ({
                                    id: s.sprintId,
                                    isOpen: !s.closingStatus,
                                    startDate: s.startDate,
                                }))}
                                sprintChangeCallback = {this.handleSprintChange}
                                selectedSprintId = {this.state.sprintId}
                                isDisabled = {this.state.projectId === undefined}
                            />
                        </div>
                    </div>



                <Button variant="contained" color="primary" disabled={!this.declareHoursButtonEnabled()}
                        onClick={this.setDeclareHoursMode}
                        className={classes.button}>
                    Declare Hours
                </Button>
                <Button variant="contained" color="primary" disabled={!this.closeSprintButtonEnabled()}
                        onClick={this.setCloseSprintMode}
                        className={classes.button}>
                    Close Sprint
                </Button>
                <Button variant="contained" color="primary" disabled={!this.editProjectButtonEnabled()}
                        onClick={this.setCloseProjectMode}
                        className={classes.button}>
                    Edit Project
                </Button>
                <Button variant="contained" color="primary" disabled={!this.newSprintButtonEnabled()}
                        onClick={this.setCloseProjectMode}
                        className={classes.button}>
                    New Sprint
                </Button>
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
            </div>

        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview)
