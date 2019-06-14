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
import DeclareHoursDialog from "./DeclareHoursDialog";
import CreateSprintDialog from "./CreateSprintDialog";
import SprintStatistics from "./SprintStatistics";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

function usersDeclarationsJoin(users, declarations) {
    if(users.length === 0 || declarations.length === 0)
        return [];

    return declarations.map(d => {
        const user = users.find(u => u.userId === d.userId);
        return ({
            ...d,
            mail: user.mail,
            name: user.name
        });
    });
}

class Overview extends React.Component {

    state = {
        allProjects: [],
        projects: [],
        sprints: [],
        declarations: [],
        users: [],
        memberships: [],
        projectId: undefined,
        sprintId: undefined,
        userId: null
    };

    isAdmin() {
        return JSON.parse(localStorage.getItem('user')).role === 1;
    }

    isScrumMaster() {
        const membership = this.getMembership();
        return membership && membership.isScrumMaster;
    }

    isMember() {
        return this.getMembership() !== null;
    }

    fetchAndSetMemberships() {
        document.body.style.cursor = 'wait';
        const userId = JSON.parse(localStorage.getItem('user')).userId;
        api.fetch(
            api.endpoints.getUserProjectMemberships(userId),
            (response) => {
                this.setState({memberships: response});
                document.body.style.cursor = 'default';
            });
    }

    fetchAndSetProjects() {
        document.body.style.cursor = 'wait';
        api.fetch(
            api.endpoints.getProjects(),
            (response) => {
                this.setState({allProjects: response});
                document.body.style.cursor = 'default';
            });
    }

    setUserProjects() {
        const {projects, allProjects, memberships} = this.state;

        if (this.isAdmin() && (projects.length < allProjects.length)) {
            this.setState({projects: allProjects});
            return;
        }

        if ((allProjects.length > 0) && (memberships.length > projects.length)) {
            const userProjects = memberships.map(m => allProjects.find(p => p.projectId === m.projectId));
            this.setState({projects: userProjects});
        };
    }

    fetchAndSetSprints(projectId) {
        if (projectId !== undefined) {
            document.body.style.cursor = 'wait';
            api.fetch(
                api.endpoints.getSprints(projectId),
                (response) => {
                    this.setState({sprints: response});
                    document.body.style.cursor = 'default';
                });
        } else
            this.setState({sprints: []})
    }

    fetchAndSetDeclarations(projectId, sprintId) {
        if (projectId !== undefined && sprintId !== undefined) {
            document.body.style.cursor = 'wait';
            api.fetch(
                api.endpoints.getDeclarations(projectId, sprintId),
                (response) => {
                    this.setState({declarations: response});
                    document.body.style.cursor = 'default';
                });
        } else
            this.setState({declarations: []})
    }

    fetchAndSetUsers() {
        document.body.style.cursor = 'wait';
        api.fetch(
            api.endpoints.getUsers(),
            (response) => {
                this.setState({users: response});
                document.body.style.cursor = 'default';
            });
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
        this.setState({
            projectId: projectId,
            sprintId: sprintId,
            userId: JSON.parse(localStorage.getItem('user')).userId
        });

        this.fetchAndSetMemberships();
        this.fetchAndSetProjects();
        this.fetchAndSetSprints(projectId);
        this.fetchAndSetDeclarations(projectId, sprintId);
        this.fetchAndSetUsers();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {projectId, sprintId} = this.getUrlParams(window.location);
        const {allProjects, memberships, projects} = this.state;

        if (prevState.projectId !== projectId) {
            this.setState({projectId: projectId});
            this.fetchAndSetSprints(projectId);
        }

        if (prevState.projectId !== projectId || prevState.sprintId !== sprintId) {
            this.setState({sprintId: sprintId});
            this.fetchAndSetDeclarations(projectId, sprintId);
        }

        if ((this.isAdmin() && (allProjects.length > projects.length)) || (memberships.length > projects.length)) {
            this.setUserProjects();
        }
    }

    getActiveProject() {
        return this.state.projects.find(p => p.projectId === this.state.projectId) || null
    }

    getActiveSprint() {
        return this.state.sprints.find(s => s.sprintId === this.state.sprintId) || null
    }

    getMembership() {
        const project = this.getActiveProject();
        if(project === null)
            return null;

        return this.state.memberships.find(m => m.projectId === project.projectId) || null;
    }

    getNeighbourSprints() {
        const {sprints, sprintId} = this.state;
        if (sprintId === undefined)
            return {previous: undefined, next: undefined};

        return {
            previous: sprints.find(s => s.sprintId === sprintId - 1),
            next: sprints.find(s => s.sprintId === sprintId + 1),
        };
    }

    declareHoursButtonEnabled() {
        const activeProject = this.getActiveProject();
        const activeSprint = this.getActiveSprint();

        return this.isMember() && 
            activeProject && activeProject.closingStatus === false &&
            activeSprint && activeSprint.closingStatus === false
    }

    userDeclaration() {
        return this.state.declarations.find(d => d.userId === this.state.userId)
    }

    newSprintButtonEnabled() {
        const activeProject = this.getActiveProject();
        return (this.isScrumMaster() || this.isAdmin()) &&
            activeProject && activeProject.closingStatus === false
    }

    closeSprintButtonEnabled() {
        const activeProject = this.getActiveProject();
        const activeSprint = this.getActiveSprint();

        return (this.isScrumMaster() || this.isAdmin()) &&
            activeProject && activeSprint;
    }

    getDefaultNewSprintDate() {
        const {sprints} = this.state;
        const project = this.getActiveProject();

        if (!project)
            return null;

        const latestSprint = sprints.reduce((acc, s) => (acc === null || s.sprintId > acc.sprintId) ? s : acc, null)
        return latestSprint ? new Date(latestSprint.endDate) : new Date(project.startDate)
    }

    render() {
        const {classes} = this.props;
        const {projectId, sprintId, userId, declarations, users} = this.state;
        const {next, previous} = this.getNeighbourSprints();

        return (
            <div className={classes.root}>
                <div className={classes.content}>
                    <div className={classes.selectSection}>
                        <div className={classes.singleSelectionContainer}>
                            <div className={classes.selectionHeader}>
                                <Typography variant="h4" className={classes.sectionTitle}>
                                    Project
                                </Typography>
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

                        {this.getActiveProject() &&
                        <div className={classes.singleSelectionContainer}>
                            <div className={classes.selectionHeader}>
                                <Typography variant="h4" className={classes.sectionTitle}>
                                    Sprint
                                </Typography>
                                <div className={classes.buttonsContainer}>
                                    
                                    <Button variant="outlined"
                                            onClick={() => this.props.history.push(`/overview?project=${this.state.projectId}&sprint=${next.sprintId}`)}
                                            className={classes.arrowButton}
                                            size='small'
                                            disabled={next === undefined}>
                                        next
                                        <KeyboardArrowRightIcon fontSize='small' className={classes.test}/>

                                    </Button>

                                    <Button variant="outlined"
                                            onClick={() => this.props.history.push(`/overview?project=${this.state.projectId}&sprint=${previous.sprintId}`)}
                                            className={classes.arrowButton}
                                            size='small'
                                            disabled={previous === undefined}>
                                        <KeyboardArrowLeftIcon fontSize='small'/>
                                        prev
                                    </Button>

                                    {this.newSprintButtonEnabled() &&
                                        <div className={classes.dialogCreateSprint}>
                                        <CreateSprintDialog
                                            project={this.getActiveProject()}
                                            parentUpdateCallback={() => this.fetchAndSetSprints(projectId)}
                                            disabled={!this.newSprintButtonEnabled()}
                                            defaultStartDate={this.getDefaultNewSprintDate()}
                                            history={this.props.history}
                                        />
                                        </div>
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
                        }
                    </div>

                    {this.getActiveSprint() &&
                    <div>
                        <Paper className={classes.statisticsPaper} elevation={2}>
                            <SprintStatistics sprint={this.getActiveSprint()}
                                              project={this.getActiveProject()}
                                              summariseDisabled={!this.closeSprintButtonEnabled()}
                                              afterCloseUpdateCallback={() => this.fetchAndSetSprints(projectId)}/>
                        </Paper>

                        <div className={classes.tableContainer}>
                            <Typography variant="h4" gutterBottom className={classes.sectionTitle}>
                                Declarations
                            </Typography>
                            {this.declareHoursButtonEnabled() &&
                                <DeclareHoursDialog
                                    disabled={!this.declareHoursButtonEnabled()}
                                    declaration={this.userDeclaration()}
                                    project={this.getActiveProject()}
                                    sprint={this.getActiveSprint()}
                                    userId={userId}
                                    parentUpdateCallback={() => this.fetchAndSetDeclarations(projectId, sprintId)}
                                />
                            }
                            <div className={classes.table}>
                                <Divider/>
                                <SimpleTable data={usersDeclarationsJoin(users, declarations)}/>
                                <Divider/>
                            </div>

                        </div>
                    </div>
                    }
                    {this.getActiveSprint() &&
                        <div className={classes.chartContainer}>
                            <Typography variant="h4" gutterBottom>
                                Factor chart
                            </Typography>
                            <div component="div" className={classes.chart}>
                                <SimpleLineChart
                                    sprints={this.state.sprints.map(s => ({
                                        ...s,
                                    })).filter(s => s.closingStatus)}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview)
