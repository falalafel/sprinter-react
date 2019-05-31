import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import api from "../api";
import { userRole } from '../userRole';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton/index';

const styles = theme => ({
    root: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    container: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    firstRow:{
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    firstField:{
        width:'85%',
        marginTop: theme.spacing.unit,
    },
    adminIcon:{
        marginTop: theme.spacing.unit*2,
        marginLeft: theme.spacing.unit*3,
    },
    textField: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
});

class AddUser extends React.Component {

    state = {
        username: 'mabe will be added',
        name: '',
        mail: '',
        password: '',
        repeatedPassword: '',
        role: userRole.NORMAL,
    };

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value.trim()})
    };

    handleNameChange = (event) => {
        this.setState({name: event.target.value.trim()})
    };

    handleMailChange = event => {
        this.setState({mail: event.target.value.trim()})
    };

    handlePasswordChange = event => {
        this.setState({password: event.target.value})
    };

    handleRepeatedPasswordChange = event => {
        this.setState({repeatedPassword: event.target.value})
    };

    handleRoleChange = event => {
        this.setState({role: event.target.value})
    };

    isAdmin = () => {
        return this.state.role === userRole.ADMIN
    };

    handleToggleRole = (event) => {
        this.isAdmin() ? this.setState({role: userRole.NORMAL}) : this.setState({role: userRole.ADMIN})
    };

    validate() {
        const {username, name, mail, password, repeatedPassword, role} = this.state;
        return (
            (username.length >= 3) &&
            (name.length >= 3) &&
            (mail.length >= 3) &&
            (mail.includes('@')) &&
            (password.length >= 3) &&
            (password === repeatedPassword) &&
            (role === userRole.NORMAL || role === userRole.ADMIN)
        );
    }

    handleAddUser = () => {
        const {name, mail, password, role} = this.state;

        const data = {
            name: name,
            mail: mail,
            password: password,
            role: role,
        };

        api.fetch(
            api.endpoints.addUser(data),
            (user) => {
                this.props.history.push(`/overview`);
                console.log(user.userId)
            }
        );
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
            <form className={classes.container} noValidate>
                <Typography component="h1" variant="h3">
                    Create user account
                </Typography>

                <div className={classes.firstRow}>
                    <TextField 
                        className={classes.firstField}
                        label="Name"
                        margin="normal"
                        error={this.state.name.length < 3}
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />

                    <IconButton
                        className={classes.adminIcon}
                        aria-label='Toggle scrum master'
                        onClick={() => this.handleToggleRole()}
                        title={(this.isAdmin() ? 'remove' : 'add') + ' admin status'}
                        >
                        <PeopleIcon color={this.isAdmin() ? 'inherit' : 'disabled'}/>
                    </IconButton>
                </div>

                {/* <TextField
                    label="Full name"
                    className={classes.textField}
                    margin="normal"
                    error={this.state.name.length < 3}
                    value={this.state.name}
                    onChange={this.handleNameChange}
                /> */}

                <TextField
                    label="Mail"
                    className={classes.textField}
                    margin="normal"
                    error={this.state.mail.length < 3 || !this.state.mail.includes('@')}
                    value={this.state.mail}
                    onChange={this.handleMailChange}
                />

                <TextField
                    label="Password"
                    type="password"
                    className={classes.textField}
                    margin="normal"
                    error={this.state.password.length < 3}
                    value = {this.state.password}
                    onChange={this.handlePasswordChange}
                />

                <TextField
                    label="Repeat password"
                    type="password"
                    className={classes.textField}
                    margin="normal"
                    error={this.state.password !== this.state.repeatedPassword}
                    value={this.state.repeatedPassword}
                    onChange={this.handleRepeatedPasswordChange}
                />
                <Button
                    disabled={!this.validate()}
                    onClick={this.handleAddUser}
                    color="primary"
                    variant="contained"
                    className={classes.addUserButton}
                    >
                    Register user
                </Button>
            </form>
        </div>
        );
    }

}

AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);
