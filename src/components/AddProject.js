import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreate from "./ProjectMembersCreate";
import api from "../api";
import ProjectConfig from "./ProjectConfig";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {resolve} from 'dns';

const styles = (theme) => ({
    root: {},
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40
    },
    projectConfig: {
        float: 'right',
        marginRight: '4%',
    },
    projectMembers: {
        float: 'left',
        marginLeft: '4%',
    },
    addProjectButton: {
        marginTop: theme.spacing.unit * 3,
        width: 400,
        height: 50,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd
}

class AddProject extends React.Component {

    state = {
        // users list component
        usersList: [],
        members: [],
        // project configuration component
        projectName: '',
        startingDate: getCurrentDate(),
        sprintLength: 7,
        startingFactor: 2.5,
    };

    componentDidMount() {
        this.fetchAndSetUsers()
    }

    fetchAndSetUsers() {
        api.fetch(
            api.endpoints.getUsers(),
            (response) => {
                this.setState({usersList: response})
            });
    }

    toggleScrumMaster = (userId) => {
        this.setState({
            members: this.state.members.map(
                user => user.userId === userId ? ({
                    ...user,
                    isScrumMaster: !user.isScrumMaster
                }) : user
            )
        })
    };

    validate() {
        const {projectName, startingDate, sprintLength, startingFactor} = this.state;

        return (
            (projectName.trim() !== '') &&
            (startingDate.trim() !== '') &&
            (Number.isInteger(sprintLength)) &&
            (!isNaN(startingFactor))
        );
    }

    handleProjectNameChange = (event) => {
        this.setState({projectName: event.target.value.trim()});
    };

    handleStartingDateChange = (event) => {
        this.setState({startingDate: event.target.value})
    };

    handleSprintLengthChange = (event) => {
        this.setState({sprintLength: Math.max(1, Math.min(parseInt(event.target.value), 366))})
    };

    handleStartingFactorChange = (event) => {
        this.setState({startingFactor: Math.max(0.1, Math.min(parseFloat(event.target.value), 10))})
    };

    removeMember = (userId) => {
        this.setState({
            members: this.state.members.filter(
                user => userId !== user.userId
            )
        })
    };

    addMember = (userId) => {
        const user = this.state.usersList.find(u => u.userId === userId);
        const newMember = ({...user, isScrumMaster: false});
        this.setState({members: [newMember].concat(this.state.members)})
    };

    handleAddProjectButton = () => {
        const data = {
            name: this.state.projectName,
            startDate: this.state.startingDate,
            sprintDuration: this.state.sprintLength,
        };

        // first, adds new project
        api.fetch(
            api.endpoints.createProject(data),

            // after the project is added, adds membership for all declared users
            (newProjectId) => {

                Promise.all(this.state.members.map((member) => {

                    api.fetchNoContent(api.endpoints.setProjectMembership(
                        newProjectId,
                        member.userId,
                        {isScrumMaster: member.isScrumMaster}
                        ),
                        () => {
                            return new Promise(() => resolve())
                        })
                })).then(
                    // when all members are added successfully, redirects to overview for the project
                    (result) => this.props.history.push(`/overview?project=${newProjectId}`)
                )
            }
        );
    };

    render() {

        const {classes} = this.props;
        const {members, usersList} = this.state;

        const {
            projectName, startingDate, sprintLength, startingFactor,
        } = this.state;

        const valid = this.validate();

        const notMembers = usersList.filter(user => (
            !members.map(m => m.userId).includes(user.userId)
        ));

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12}>
                        <div className={classes.title}>
                            <Typography variant="h3">
                                Add new project
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.projectConfig}>
                            <ProjectConfig
                                projectName={projectName}
                                startingDate={startingDate}
                                sprintLength={sprintLength}
                                startingFactor={startingFactor}
                                projectNameChangeCallback={this.handleProjectNameChange}
                                startingDateChangeCallback={this.handleStartingDateChange}
                                sprintLengthChangeCallback={this.handleSprintLengthChange}
                                startingFactorChangeCallback={this.handleStartingFactorChange}
                            />
                            <Button
                                disabled={!valid}
                                onClick={this.handleAddProjectButton}
                                color="primary"
                                variant="contained"
                                className={classes.addProjectButton}
                            >
                                add project
                            </Button>
                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.projectMembers}>
                            <ProjectMembersCreate
                                members={members}
                                notMembers={notMembers}
                                addMemberCallback={(userId) => this.addMember(userId)}
                                toggleScrumMasterCallback={(userId) => this.toggleScrumMaster(userId)}
                                removeMemberCallback={(userId) => this.removeMember(userId)}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

AddProject.propTypes = {
    classes: PropTypes.object.isRequired,
    redirectToDashboardCallback: PropTypes.func,
};

export default withStyles(styles)(AddProject);