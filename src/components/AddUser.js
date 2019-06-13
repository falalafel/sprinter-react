import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import api from "../api";
import {userRole} from '../userRole';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';
import Snackbar from "@material-ui/core/Snackbar";

const styles = {
    root: {},
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40,
    },
    inputContainer: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mailInput: {
        width: 400,
        height: 60
    },
    roleInputContainer: {
        marginTop: 40,
        marginLeft: -20,
        fontSize: 20,
    },
    submitButtonContainer: {
        marginTop: 40,
    },

};

class AddUser extends React.Component {

    state = {
        name: '',
        mail: '',
        role: userRole.NORMAL,
        createdMessageOpen: false,
    };

    handleNameChange = event => {
        this.setState({name: event.target.value})
    };

    handleMailChange = event => {
        this.setState({mail: event.target.value.trim()})
    };

    handleRoleChange = () => {
        this.setState({role: this.state.role === userRole.ADMIN ? userRole.NORMAL : userRole.ADMIN});
    };

    isMailValid = () => {
        const result = this.state.mail.match(/.+@.+\..+/g);
        return result !== null;
    };

    isNameValid = () => {
        return this.state.name.trim() !== '';
    };

    handleAddUser = () => {
        const {name, mail, role} = this.state;

        const data = {
            name: name.trim(),
            mail: mail,
            role: role,
        };

        api.fetch(
            api.endpoints.addUser(data),
            (user) => {
                this.setState({
                    name: '',
                    mail: '',
                    role: userRole.NORMAL,
                    createdMessageOpen: true,
                })
            }
        );
    };

    render() {
        const {classes} = this.props;
        const {role} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <Typography variant="h3">
                        Create new user account
                    </Typography>
                </div>

                <form>
                    <Grid container spacing={0} justify='center'>
                        <Grid item xs={12}>
                            <div className={classes.inputContainer}>
                                <TextField
                                    label="Full name"
                                    className={classes.mailInput}
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.inputContainer}>
                                <TextField
                                    label="E-mail"
                                    className={classes.mailInput}
                                    helperText={this.isMailValid() ? '' : 'Given e-mail is not valid'}
                                    value={this.state.mail}
                                    onChange={this.handleMailChange}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.inputContainer}>
                                <div className={classes.roleInputContainer}>
                                    <Switch
                                        checked={role === userRole.ADMIN}
                                        onChange={() => this.handleRoleChange()}
                                        color="primary"
                                    />
                                    Administrator privileges
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.inputContainer}>
                                <div className={classes.submitButtonContainer}>
                                    <Button
                                        disabled={!this.isMailValid() || !this.isNameValid()}
                                        onClick={this.handleAddUser}
                                        color="primary"
                                        variant="contained"
                                        className={classes.addUserButton}
                                    >
                                        Register user
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </form>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.createdMessageOpen}
                    onClose={() => this.setState({createdMessageOpen: false})}
                    autoHideDuration={3500}
                    message={'Account created successfully'}
                />
            </div>
        );
    }

}

AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);
