import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {userRole} from "../userRole";
import api from "../api";
import ProfileDropdownMenu from './ProfileDropdownMenu';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    core: {
        marginTop: 65,
    },
    appBar: {
        height: 65,
    },
    appBarSpacer: theme.mixins.toolbar,
});

class SprinterAppBar extends React.Component {

    state = {
        renderDashboard: true,
        renderAddProject: false,
    };

    handleAddProject = () => {
        this.props.history.push('/new-project')
    };

    handleAddUser = () => {
        this.props.history.push('/add-user')
    };

    handleOverview = () => {
        this.props.history.push('/overview')
    };

    handleLogOut = () => {
        api.fetch(api.endpoints.signOut(), (response) => {});
        localStorage.removeItem('user');
        this.props.history.push('/sign-in')
    };

    handleProfile = () => {
        this.props.history.push('/profile')
    };

    render() {
        const {classes} = this.props;
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Sprinter
                        </Typography>
                        {loggedUser && <Button color="inherit" onClick={this.handleOverview}>Overview</Button>}
                        {loggedUser && loggedUser.role === userRole.ADMIN && <Button color="inherit" onClick={this.handleAddProject}>New Project</Button>}
                        {loggedUser && loggedUser.role === userRole.ADMIN && <Button color="inherit" onClick={this.handleAddUser}>New User</Button>}
                        {loggedUser && <ProfileDropdownMenu logoutCallback={this.handleLogOut} profileCallback={this.handleProfile}/>}
                    </Toolbar>
                </AppBar>
                <div className={classes.appBarSpacer}/>
            </div>
        );
    }
}

SprinterAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SprinterAppBar);
