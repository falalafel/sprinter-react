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

const styles = theme => ({
    textField: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing.unit * 4,
    },
});

class DeclareHoursDialog extends React.Component {

    state = {
        open: false,
        availableHours: "",
        hoursLeft: "",
        comment: ""
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    setNonNegativeValue = name => event => {
        const value = event.target.value || null;
        const properValue = value !== null ? Math.max(value, 0) : "";
        this.setState({[name]: properValue});
    };

    setComment = event => {
        this.setState({comment: event.target.value});
    };

    isValid = () => {
        const {availableHours, hoursLeft} = this.state;
        return availableHours !== "" && hoursLeft !== "";
    };

    submitDeclaration = () => {
        const projectId = this.props.project.projectId;
        const sprintId = this.props.sprint.sprintId;
        const {availableHours, hoursLeft, comment} = this.state;

        const data = {
            hoursAvailable: availableHours,
            workNeeded: hoursLeft,
            comment: comment
        };

        api.fetchNoContent(
            api.endpoints.declareHours(
                projectId,
                sprintId,
                1, //TODO add proper userID
                data
            ),
            () => {
                this.handleClose();
                this.props.parentUpdateCallback();
            });
    };

    render() {
        const {classes, sprint, project} = this.props;
        const sprintId = sprint ? sprint.sprintId : null;
        const projectName = project ? project.name : null;

        return (

            <div>
                <Button variant="contained" color="primary"
                        onClick={this.handleClickOpen}
                        disabled={this.props.disabled}>
                    Add declaration
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="declare-hours-form"
                >
                    <DialogTitle id="declare-hours-form">{projectName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Declaration for sprint {sprintId}
                        </DialogContentText>
                        <TextField
                            id="available-hours"
                            label="Available hours"
                            className={classes.textField}
                            value={this.state.availableHours}
                            onChange={this.setNonNegativeValue("availableHours")}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="hours-left"
                            label="Hours needed to finish last sprints tasks"
                            className={classes.textField}
                            value={this.state.hoursLeft}
                            onChange={this.setNonNegativeValue("hoursLeft")}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="comment"
                            label="Comment"
                            className={classes.textField}
                            value={this.state.comment}
                            onChange={this.setComment}
                            margin="normal"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitDeclaration} color="primary" disabled={!this.isValid()}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

DeclareHoursDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object,
    sprint: PropTypes.object,
    parentUpdateCallback: PropTypes.func
};

export default withStyles(styles)(DeclareHoursDialog);
