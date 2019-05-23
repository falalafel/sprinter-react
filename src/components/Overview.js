import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Typography from '@material-ui/core/Typography/index';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import api from "../api";
import styles from "./Overview.styles";
import {Button, Divider, Paper} from "@material-ui/core";
import ProjectSelect from "./ProjectSelect";
import SprintSelect from "./SprintSelect";
import CloseSprintDialog from "./CloseSprintDialog";
import DeclareHoursDialog from "./DeclareHoursDialog";
import CreateSprintDialog from "./CreateSprintDialog";
import EditIcon from '@material-ui/icons/Edit';
import SprintStatistics from "./SprintStatistics";


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
                    <div className={classes.selectSection}>
                        <div className={classes.singleSelectionContainer}>
                            <div className={classes.selectionHeader} >
                                <Typography variant="h4" className={classes.sectionTitle}>
                                    Project
                                </Typography>
                                <div className={classes.buttonsContainer}>
                                    {//this.newSprintButtonEnabled() && //TODO am i scrum master
                                        <CreateSprintDialog
                                            project={this.getActiveProject()}
                                            parentUpdateCallback={() => this.fetchAndSetSprints(projectId)}
                                            disabled={!this.newSprintButtonEnabled()}
                                        />
                                    }
                                    {//this.editProjectButtonEnabled() && //TODO am i scrum master
                                        <Button variant="contained"
                                                onClick={() => this.props.history.push(`/manage-project/project=${projectId}`)}
                                                className={classes.button}
                                                size='small'
                                                disabled={!this.editProjectButtonEnabled()}>
                                            <EditIcon className={classes.buttonIcon} fontSize='small' />
                                            Configure
                                        </Button>
                                    }
                                </div>
                            </div>
                            <div className={classes.projectSelection}>
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
                        </div>

                        <div className={classes.singleSelectionContainer}>
                            <div className={classes.selectionHeader}>
                                <Typography variant="h4" className={classes.sectionTitle}>
                                    Sprint
                                </Typography>
                                <div className={classes.buttonsContainer}>
                                    {//this.closeSprintButtonEnabled() && //TODO am i scrum master
                                        <CloseSprintDialog
                                            project={this.getActiveProject()}
                                            sprint={this.getActiveSprint()}
                                            parentUpdateCallback={() => this.fetchAndSetSprints(projectId)}
                                            disabled={!this.closeSprintButtonEnabled()}
                                        />
                                    }
                                </div>
                            </div>
                            <div className={classes.sprintSelection}>
                                <SprintSelect
                                    sprints={this.state.sprints.map(s => ({
                                        id: s.sprintId,
                                        isOpen: !s.closingStatus,
                                        startDate: s.startDate,
                                        endDate: s.endDate
                                    }))}
                                    sprintChangeCallback={this.handleSprintChange}
                                    selectedSprintId={this.state.sprintId}
                                    isDisabled={this.state.projectId === undefined}
                                />
                            </div>
                        </div>
                    </div>

                    <Paper className={classes.statisticsPaper} elevation={2}>
                        <SprintStatistics sprint={this.getActiveSprint()} />
                    </Paper>

                    <div className={classes.tableContainer}>
                        <Typography variant="h4" gutterBottom className={classes.sectionTitle}>
                            Declarations
                        </Typography>
                        <DeclareHoursDialog
                            disabled={!this.declareHoursButtonEnabled()}
                            project={this.getActiveProject()}
                            sprint={this.getActiveSprint()}
                            parentUpdateCallback={() => this.fetchAndSetDeclarations(projectId, sprintId)}
                        />
                        <div className={classes.table}>
                            <Divider/>
                            <SimpleTable data={this.state.declarations.map(item => declarationListItem(item))}/>
                            <Divider/>
                        </div>

                    </div>

                    <div className={classes.chartContainer}>
                        <Typography variant="h4" gutterBottom>
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
