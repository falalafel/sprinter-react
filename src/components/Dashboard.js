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
import {Button} from "@material-ui/core";
import DeclareHours from "./DeclareHours";
import CloseSprint from "./CloseSprint";
import ProjectManagement from "./ProjectManagement"

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


class Dashboard extends React.Component {
    state = {
        activeProjectId: null,
        activeSprintId: null,
        projects: [],
        sprints: [],
        declarations: [],
        isDeclareHours: false,
        validDeclareButton: false,
        isCloseSprint: false,
        validCloseSprintButton: false,
        isProjectManagement: false,
        validProjectManagementButton: false
    };

    fetchAndSetProjects() {
        api.fetch(
            api.endpoints.getProjects(),
            (response) => {
                this.setState({projects: response})
            });
    }

    fetchAndSetSprint() {
        api.fetch(
            api.endpoints.getSprints(this.state.activeProjectId),
            (response) => {
                this.setState({sprints: response})
            });
    }

    fetchAndSetDeclarations() {
        api.fetch(
            api.endpoints.getDeclarations(this.state.activeProjectId, this.state.activeSprintId),
            (response) => {
                this.setState({declarations: response})
            });
    }

    declareCallback = (data) => {
        api.fetch(
            api.endpoints.declareHours(this.state.activeProjectId, this.state.activeSprintId, 100, data),
            () => {
                this.closeDeclareHoursMode()
            })
    };

    closeSprintCallback = (data) => {
        api.fetchNoContent(
            api.endpoints.closeSprint(this.state.activeProjectId, this.state.activeSprintId, data),
            () => {
                this.closeCloseSprintMode()
            })
    };

    managementCallback = (data) => {
        api.fetch(
            api.endpoints.updateProject(this.state.activeProjectId, data),
            () => {
                this.closeProjectManagementMode()
            })
    };

    setCloseSprintMode = () => {
        this.setState({isCloseSprint: true})
    };

    closeCloseSprintMode = () => {
        this.setState({isCloseSprint: false});
        this.setState({activeSprintId: null});
        this.setState({activeProjectId: null});
    };


    setActiveProject = (projectId) => {
        this.setState({activeProjectId: projectId})
    };

    setActiveSprint = (sprintId) => {
        this.setState({activeSprintId: sprintId})
    };

    setDeclareHoursMode = () => {
        this.setState({isDeclareHours: true})
    };

    closeDeclareHoursMode = () => {
        this.setState({isDeclareHours: false});
        this.setState({activeSprintId: null});
        this.setState({activeProjectId: null});
    };

    setProjectManagementMode = () => {
        this.setState({isProjectManagement: true})
    };

    closeProjectManagementMode = () => {
        this.setState({isProjectManagement: false})
    };

    componentDidMount() {
        this.fetchAndSetProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.activeProjectId !== prevState.activeProjectId && this.state.activeProjectId !== null) {
            this.fetchAndSetSprint();
            this.setState({validProjectManagementButton: true})
        } else if (this.state.activeSprintId !== prevState.activeSprintId && this.state.activeSprintId !== null) {
            this.fetchAndSetDeclarations();
            this.setState({validDeclareButton: true});
            this.setState({validCloseSprintButton: true})
        }
    }

    disableDeclareButton = () => {
        this.setState({validDeclareButton: false});
        this.setState({validCloseSprintButton: false});
    };

    disableCloseSprintButton = () => {
        this.setState({validDeclareButton: false});
        this.setState({validCloseSprintButton: false});
    };

    disableProjectManagementButton = () => {
        this.setState({validProjectManagementButton: false}); // are you sure about the funcs above?
    }

    render() {
        const {classes} = this.props;

        return (
            !this.state.isDeclareHours ?
                !this.state.isCloseSprint ?
                    !this.state.isProjectManagement ?
                        <div className={classes.root}>
                            <CssBaseline/>
                            <div className={classes.content}>
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
                                <Button variant="contained" color="primary" disabled={!this.state.validDeclareButton}
                                        onClick={this.setDeclareHoursMode}
                                        className={classes.button}>
                                    Declare Hours
                                </Button>
                                <Button variant="contained" color="primary" disabled={!this.state.validCloseSprintButton}
                                        onClick={this.setCloseSprintMode}
                                        className={classes.button}>
                                    Close Sprint
                                </Button>
                                <Button variant="contained" color="primary" disabled={!this.state.validProjectManagementButton}
                                        onClick={this.setProjectManagementMode}
                                        className={classes.button}>
                                    Manage Project
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
                        </div>
                        : <ProjectManagement    projectName={this.state.activeProjectId}
                                                projectId={this.state.activeProjectId}
                                                // closeProjectManagement={this.closeProjectManagementMode}
                                                managementCallback={this.closeProjectManagementMode}
                                                buttonDisableCallback={this.disableProjectManagementButton} />
                    : <CloseSprint  sprintId={this.state.activeSprintId}
                                    projectName={this.state.activeProjectId}
                                    closeCloseSprint={this.closeCloseSprintMode}
                                    closeSprintCallback={this.closeSprintCallback}
                                    buttonDisableCallback={this.disableCloseSprintButton}/>
                : <DeclareHours sprintId={this.state.activeSprintId}
                                projectName={this.state.activeProjectId}
                                closeDeclareHours={this.closeDeclareHoursMode}
                                declareCallback={this.declareCallback}
                                buttonDisableCallback={this.disableDeclareButton}/>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
