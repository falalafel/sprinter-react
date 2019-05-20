import React from 'react';
import {Redirect} from 'react-router-dom';
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
import CloseProject from "./CloseProject";
import {withRouter, Link} from 'react-router-dom';


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
    };

    handleProjectChange = (projectId) => {
        if (projectId !== this.props.match.params.projectId) {

            if (projectId === "") {
                this.props.history.push('/overview/')
            } else {
                this.props.history.push(`/overview/${projectId}/`)
            }
        }
    };

    handleSprintChange = (sprintId) => {
        const {projectId} = this.props.match.params
        console.log("tru:",this.props.match.params)
        console.log("lololll")
        console.log(projectId, this.props.match.params)
        if (sprintId !== this.props.match.params.sprintId) {

            if (sprintId === "") {
                this.props.history.push(`/overview/${projectId}/`)
            } else {
                this.props.history.push(`/overview/${projectId}/${sprintId}/`)
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

        else this.setState({sprints: []})
    }

    fetchAndSetDeclarations(projectId, sprintId) {

        if (projectId !== undefined && sprintId !== undefined)
            api.fetch(
                api.endpoints.getDeclarations(projectId, sprintId),
                (response) => {
                    this.setState({declarations: response})
                });

        else this.setState({declarations: []})
    }

    componentDidMount() {
        const {projectId, sprintId} = this.props.match.params

        this.fetchAndSetProjects()
        
        if (projectId !== undefined)
            this.fetchAndSetSprints(projectId)
        else 
            this.setState({sprints: []})

        if (sprintId !== undefined) 
            this.fetchAndSetDeclarations(projectId, sprintId)
        else 
            this.setState({declarations: []})
    }

    componentDidUpdate(prevProps) {
        const { projectId, sprintId } = this.props.match.params

        if (prevProps.match.params.projectId !== projectId)
            this.fetchAndSetSprints(projectId)

        if (prevProps.match.params.projectId !== projectId ||
                prevProps.match.params.sprintId !== sprintId)
            this.fetchAndSetDeclarations(projectId, sprintId)
      }


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Link to='/overview/'>clean</Link>
                <Typography variant="h5" gutterBottom component="h2">
                    Projects Overview
                </Typography>
                <SimpleSelect
                    label={'project'}
                    itemListCallback={this.handleProjectChange}
                    itemList={this.state.projects.map(item => projectListItem(item))}/>
                <Typography variant="h5" gutterBottom component="h2">
                    Sprints Overview
                </Typography>
                <SimpleSelect
                    label={'sprint'}
                    itemListCallback={this.handleSprintChange}
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
