import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import api from "../api";
import {userRole} from '../userRole';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton/index';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {Grid} from "@material-ui/core";
import Switch from '@material-ui/core/Switch';

const styles = {
    root: {},
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40,
        marginBottom: 15,
    },
    inputContainer: {
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
        mail: '',
        role: userRole.NORMAL,
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

    handleAddUser = () => {
        const {mail, role} = this.state;

        const data = {
            mail: mail,
            role: role,
        };

        api.fetch(
            api.endpoints.addUser(data),
            (user) => {
                this.props.history.push('/overview');
                console.log(user.userId)
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
                                    label="E-mail"
                                    className={classes.mailInput}
                                    helperText={this.isMailValid() ? '' : 'Inserted e-mail is not valid'}
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
                                        disabled={!this.isMailValid()}
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
            </div>
        );
    }

}

AddUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUser);
