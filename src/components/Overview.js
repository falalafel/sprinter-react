import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import api from "../api";
import styles from "./Overview.styles";
import {Button, Divider} from "@material-ui/core";
import ProjectSelect from "./ProjectSelect";
import SprintSelect from "./SprintSelect";
import CloseSprintDialog from "./CloseSprintDialog";
import DeclareHoursDialog from "./DeclareHoursDialog";


function declarationListItem(declaration) {
    return {
        userId: declaration.userId,
        userName: "testowa nazwa uzytkownika xd",
        hoursAvailable: declaration.hoursAvailable,
        workNeeded: declaration.workNeeded,
        comment: declaration.comment
    };
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

    updateAfterSprintClose() {
        const {projectId, sprintId} = this.getUrlParams(window.location);

        this.fetchAndSetSprints(projectId);
    }

    updateAfterHoursDeclaration() {
        const {projectId, sprintId} = this.getUrlParams(window.location);

        this.fetchAndSetDeclarations(projectId, sprintId);
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
        const pendingUpdate = this.state.pendindUpdate;

        if (prevState.projectId !== projectId) {
            this.setState({projectId: projectId})
            this.fetchAndSetSprints(projectId)
        }

        if (prevState.projectId !== projectId || prevState.sprintId !== sprintId) {
            this.setState({sprintId: sprintId})
            this.fetchAndSetDeclarations(projectId, sprintId)
        }
    }

    getActiveProject() {
        return this.state.projects.find(p => p.projectId === this.state.projectId) || null
    }

    getActiveSprint() {
        return this.state.sprints.find(s => s.sprintId === this.state.sprintId) || null
    }

    declareHoursButtonEnabled() {
        const activeProject = this.getActiveProject()
        const activeSprint = this.getActiveSprint()

        return activeProject && activeProject.closingStatus === false && activeSprint && activeSprint.closingStatus === false
    }

    newSprintButtonEnabled() {
        // TODO: check scrum master permissions
        const activeProject = this.getActiveProject()

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
        const {projectId, sprintId} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.selectionContainer}>
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
                                projectChangeCallback={this.handleProjectChange}
                                selectedProjectId={this.state.projectId}
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
                                sprintChangeCallback={this.handleSprintChange}
                                selectedSprintId={this.state.sprintId}
                                isDisabled={this.state.projectId === undefined}
                            />
                        </div>
                    </div>

                    <div className={classes.buttonsContainer}>
                        {/*<Button variant="contained" color="primary"*/}
                        {/*        disabled={!this.declareHoursButtonEnabled()}*/}
                        {/*        onClick={() => this.props.history.push(`/declare-hours/project=${projectId}/sprint=${sprintId}`)}*/}
                        {/*        className={classes.button}>*/}
                        {/*    Declare Hours*/}
                        {/*</Button>*/}
                        <DeclareHoursDialog
                            className={classes.dialog}
                            disabled={!this.declareHoursButtonEnabled()}
                            project={this.getActiveProject()}
                            sprint={this.getActiveSprint()}
                            parentUpdateCallback={this.updateAfterHoursDeclaration.bind(this)}
                        />
                        {/* <Button variant="contained" color="primary"
                                disabled={!this.closeSprintButtonEnabled()}
                                onClick={() => this.props.history.push(`/close-sprint/project=${projectId}/sprint=${sprintId}`)}
                                className={classes.button}>
                            Close Sprint
                        </Button> */}
                        <CloseSprintDialog
                            className={classes.dialog}
                            disabled={!this.closeSprintButtonEnabled()}
                            project={this.getActiveProject()}
                            sprint={this.getActiveSprint()}
                            parentUpdateCallback={this.updateAfterSprintClose.bind(this)}
                        />
                        <Button variant="contained" color="primary"
                                disabled={!this.editProjectButtonEnabled()}
                                onClick={() => this.props.history.push(`/manage-project/project=${projectId}`)}
                                className={classes.button}>
                            Manage Project
                        </Button>
                        <Button variant="contained" color="primary"
                                disabled={!this.newSprintButtonEnabled()}
                                onClick={() => this.props.history.push(`/new-sprint/project=${projectId}`)}
                                className={classes.button}>
                            New Sprint
                        </Button>
                    </div>

                    <div className={classes.tableContainer}>
                        <Typography variant="h4" gutterBottom component="h2">
                            Declarations table
                        </Typography>
                        <Divider/>
                        <div className={classes.table}>
                            <SimpleTable data={this.state.declarations.map(item => declarationListItem(item))}/>
                        </div>
                        <Divider/>
                    </div>

                    <div className={classes.chartContainer}>
                        <Typography variant="h4" gutterBottom component="h2">
                            Factor chart
                        </Typography>
                        <div component="div" className={classes.chart}>
                            <SimpleLineChart/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview)
