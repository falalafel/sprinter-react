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
    }
});

class CloseSprintDialog extends React.Component {

    state = {
        open: false,
        estimated: "",
        burned: "",
        endPlanned: ""
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

    isValid = () => {
        const {burned, estimated, endPlanned} = this.state;
        return burned !== "" && estimated !== "" && endPlanned !== "";
    }

    closeSprint = () => {
        const projectId = this.props.project.projectId;
        const sprintId = this.props.sprint.sprintId;
        const {burned, estimated, endPlanned} = this.state;

        const data = {
            closingStatus: true,
            originalEstimatedHours: estimated,
            endPlannedHours: endPlanned,
            burnedHours: burned
        };

        api.fetchNoContent(
            api.endpoints.closeSprint(
                projectId,
                sprintId,
                data
            ),
            () => {
                this.handleClose();
                this.props.parentUpdateCallback();
            });
    }

    render() {
        const {classes, sprint, project} = this.props;
        const sprintId = sprint ? sprint.sprintId : null;
        const projectName = project ? project.name : null;

        return (

            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}
                        disabled={this.props.disabled}>
                    Close sprint
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="close-sprint-form"
                >
                    <DialogTitle id="close-sprint-form">{projectName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Closing sprint {sprintId}
                        </DialogContentText>
                        <TextField
                            id="estimated-hours"
                            label="Originally estimated work hours"
                            className={classes.textField}
                            value={this.state.estimated}
                            onChange={this.setNonNegativeValue("estimated")}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="end-planned-hours"
                            label="End planned hours"
                            className={classes.textField}
                            value={this.state.endPlanned}
                            onChange={this.setNonNegativeValue("endPlanned")}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="burned-hours"
                            label="Burned hours"
                            className={classes.textField}
                            value={this.state.burned}
                            onChange={this.setNonNegativeValue("burned")}
                            margin="normal"
                            type="number"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.closeSprint} color="primary" disabled={!this.isValid()}>
                            Close sprint
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

CloseSprintDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object,
    sprint: PropTypes.object,
    parentUpdateCallback: PropTypes.func
};

export default withStyles(styles)(CloseSprintDialog);
