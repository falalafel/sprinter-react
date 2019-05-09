import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreate from "./ProjectMembersCreate";
import api from "../api";
import ProjectConfig from "./ProjectConfig";
import {Grid} from "@material-ui/core";

const styles = {
    root: {
        marginTop: 40,
    },
    projectConfig: {
        float: 'right',
        marginRight: '3%',
    },
    projectMembers: {
        float: 'left',
        marginLeft: '3%',
    },
};

class AddProject extends React.Component {

    state = {
        usersList: [],
        members: [],
    };

    componentDidMount() {
        this.fetchAndSetUsers()
    }

    fetchAndSetUsers() {
        api.fetch(
            api.endpoints.getUsers().path,
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

    removeMember = (userId) => {
        this.setState({
            members: this.state.members.filter(
                user => userId !== user.userId
            )
        })
    };

    addMember = (userId) => {
        const newMember = this.state.usersList.find(u => u.userId === userId);
        this.setState({members: [newMember].concat(this.state.members)})
    };

    render() {

        const {classes} = this.props;
        const {members, usersList} = this.state;

        const notMembers = usersList.filter(user => (
            !members.map(m => m.userId).includes(user.userId)
        ));

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <div className={classes.projectConfig}>
                            <ProjectConfig/>
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
};

export default withStyles(styles)(AddProject);