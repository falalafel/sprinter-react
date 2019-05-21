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

    handleProjectChange = (projectId) => {
        if (projectId !== this.state.projectId) {
            if (projectId === "") {
                this.props.history.push('/overview')
            } else {
                this.props.history.push(`/overview?project=${projectId}`)
            }
        }
    };

    handleSprintChange = (sprintId) => {
        if (sprintId !== this.state.sprintId) {
            if (sprintId === "") {
                this.props.history.push(`/overview?project=${this.state.projectId}`)
            } else {
                this.props.history.push(`/overview?project=${this.state.projectId}&sprint=${sprintId}`)
            }
        }
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
            projectId: searchParams.get('project') || undefined,
            sprintId: searchParams.get('sprint') || undefined,
        };
    }

    componentDidMount() {
        const {projectId, sprintId} = this.getUrlParams(window.location);
        console.log("jestem w did MOUNT", projectId, sprintId)

        this.fetchAndSetProjects();
        this.fetchAndSetSprints(projectId);
        this.fetchAndSetDeclarations(projectId, sprintId);

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {projectId, sprintId} = this.getUrlParams(window.location);
        console.log("jestem w did update", projectId, sprintId)

        if (prevState.projectId !== projectId) {
            this.setState({projectId: projectId})
            this.fetchAndSetSprints(projectId)
        }

        if (prevState.projectId !== projectId || prevState.sprintId !== sprintId) {
            this.setState({sprintId: sprintId})
            this.fetchAndSetDeclarations(projectId, sprintId)
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Typography variant="h5" gutterBottom component="h2">
                    Projects Overview
                </Typography>
                <SimpleSelect
                    label={'project'}
                    itemListCallback={this.handleProjectChange}
                    itemList={this.state.projects.map(item => projectListItem(item))}
                    disabled={false} />
                <Typography variant="h5" gutterBottom component="h2">
                    Sprints Overview
                </Typography>
                <SimpleSelect
                    label={'sprint'}
                    itemListCallback={this.handleSprintChange}
                    itemList={this.state.sprints.map(item => sprintListItem(item))}
                    disabled={this.state.projectId === undefined} />
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
                <Button variant="contained" color="primary" disabled={!this.state.validCloseProjectButton}
                        onClick={this.setCloseProjectMode}
                        className={classes.button}>
                    Close Project
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
