import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembers from "./ProjectMembers";
import api from "../api";
import ProjectConfig from "./ProjectConfig";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {resolve} from 'dns';
import axios from 'axios';

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

class ConfigureProject extends React.Component {

    state = {
        // users list component
        users: [],
        members: [],
        // project configuration component
        project: null,
        projectName: '',
        startingDate: '',
        sprintLength: '',
        startingFactor: '',
    };

    getProjectId() {
        return this.props.match.params.projectId;
    }

    fetchAndSetProject() {
        api.fetch(
            api.endpoints.getProjectById(this.getProjectId()),
            (response) => {
                this.setState({project: response})
            });
    }

    fetchAndSetUsersData() {
        api.fetch(
            api.endpoints.getUsers(),
            (users) => {
                api.fetch(
                    api.endpoints.getProjectMembership(this.getProjectId()),
                    (members) => {
                        this.setState({
                            users: users,
                            members: members.map(m => ({...(users.find(u => u.userId === m.userId)), isScrumMaster: m.isScrumMaster}))
                        })
                    });
            });
    }

    addMember = (userId) => {
        // const user = this.state.usersList.find(u => u.userId === userId);
        // const newMember = ({...user, isScrumMaster: false, declared: false}); //TODO fetch declared
        // this.setState({members: [newMember].concat(this.state.members)})
        console.log("dodawanko")
    };

    toggleScrumMaster = (userId) => {

        const member = this.state.members.find(u => u.userId === userId)

        axios.put(`http://localhost:8080/project/${this.state.project.projectId}/membership/${userId}/`, {isScrumMaster: member.isScrumMaster})
        .then(res => {
            console.log(res);
            this.setState({
                members: this.state.members.map(
                    user => user.userId === userId ? ({
                        ...user,
                        isScrumMaster: !user.isScrumMaster
                    }) : user
                )
            });
        })
        
        console.log("toglowanko")
    };

    removeMember = (userId) => {
        // this.setState({
        //     members: this.state.members.filter(
        //         user => userId !== user.userId
        //     )
        // })
        console.log("usówanko")
    };

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

    validate() {
        const {projectName, startingDate, sprintLength, startingFactor} = this.state;

        return (
            (projectName.trim() !== '') &&
            (startingDate.trim() !== '') &&
            (Number.isInteger(sprintLength)) &&
            (!isNaN(startingFactor))
        );
    }

    handleAddProjectButton = () => {
        const data = {
            name: this.state.projectName,
            startDate: this.state.startingDate,
            sprintDuration: this.state.sprintLength,
            startingFactor: this.state.startingFactor,
        };

        // first, adds new project
        api.fetch(
            api.endpoints.createProject(data),

            (newProjectId) => {
                // after the project is added, adds membership for all declared users
                const membershipRequests = this.state.members.map((member) => {

                    return api.fetchNoContent(
                        api.endpoints.setProjectMembership(
                            newProjectId,
                            member.userId,
                            {isScrumMaster: member.isScrumMaster}
                        ),
                        () => new Promise(() => resolve())
                    )
                });

                Promise.all(membershipRequests).then(
                    // when all members are added successfully, redirects to overview for the project
                    (result) => this.props.history.push(`/overview?project=${newProjectId}`)
                )
            }
        );
    };

    componentDidMount() {
        this.fetchAndSetUsersData()
        this.fetchAndSetProject()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const project = this.state.project

        if (project !== prevState.project) {
            this.setState({...project})
        }
    }

    render() {

        const {classes} = this.props;
        const {members, users} = this.state;

        const {
            projectName, startingDate, sprintLength, startingFactor,
        } = this.state;

        const valid = this.validate();

        const notMembers = users.filter(u => (
            !members.some(m => m.userId === u.userId)
        ));

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12}>
                        <div className={classes.title}>
                            <Typography variant="h3">
                                Configure old project
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.projectConfig}>
                            {/*<ProjectConfig*/}
                            {/*    projectName={projectName}*/}
                            {/*    startingDate={startingDate}*/}
                            {/*    sprintLength={sprintLength}*/}
                            {/*    startingFactor={startingFactor}*/}
                            {/*    projectNameChangeCallback={this.handleProjectNameChange}*/}
                            {/*    startingDateChangeCallback={this.handleStartingDateChange}*/}
                            {/*    sprintLengthChangeCallback={this.handleSprintLengthChange}*/}
                            {/*    startingFactorChangeCallback={this.handleStartingFactorChange}*/}
                            {/*/>*/}
                            {/*<Button*/}
                            {/*    disabled={!valid}*/}
                            {/*    onClick={this.handleAddProjectButton}*/}
                            {/*    color="primary"*/}
                            {/*    variant="contained"*/}
                            {/*    className={classes.addProjectButton}*/}
                            {/*>*/}
                            {/*    add project*/}
                            {/*</Button>*/}
                        </div>

                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.projectMembers}>
                            <ProjectMembers
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

ConfigureProject.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigureProject);