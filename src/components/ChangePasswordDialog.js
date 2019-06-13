import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from "../api";
import CheckIcon from '@material-ui/icons/Check';

const styles = theme => ({
    textField: {
        width: '100%',
        height: 40
    },
});

class ChangePasswordDialog extends React.Component {

    state = {
        open: false,
        old: "",
        newPassword: "",
        newRepeated: ""
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
            old: "",
            newPassword: "",
            newRepeated: ""
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };

    isValid = () => {
        const old = this.state.old;
        return old !== '' && this.repeatedPasswordIsValid();
    };

    repeatedPasswordMatches = () => {
        const {newPassword, newRepeated} = this.state;
        return newPassword === newRepeated;
    }

    repeatedPasswordIsValid = () => {
        return this.state.newPassword !== '' && this.repeatedPasswordMatches();
    }    

    handleSubmit = () => {
        const {old, newPassword} = this.state;
        this.props.passwordChangeCallback(old, newPassword);
    }

    render() {
        const {classes} = this.props;
        const {old, newPassword, newRepeated} = this.state;

        return (
            <div>
                <Button variant="contained"
                        color="primary"
                        onClick={this.handleClickOpen}
                        disabled={this.props.disabled}>
                    Change password
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="change-password-form"
                >
                    <DialogTitle id="change-password-form">Changing password</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Old password"
                            type="password"
                            className={classes.textField}
                            margin="normal"
                            value={old}
                            onChange={(event) => this.setState({old: event.target.value})}
                        />
                        <TextField
                            label="New password"
                            type="password"
                            className={classes.textField}
                            margin="normal"
                            value={newPassword}
                            onChange={(event) => this.setState({newPassword: event.target.value})}
                        />
                        <TextField
                            label="Repeat new password"
                            type="password"
                            className={classes.textField}
                            margin="normal"
                            value={newRepeated}
                            onChange={(event) => this.setState({newRepeated: event.target.value})}
                            helperText={this.repeatedPasswordMatches() ? '' : 'Repeated password does not match'}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary" disabled={!this.isValid()}>
                            Change
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default withStyles(styles)(ChangePasswordDialog);
