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
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    container: {
        marginTop: theme.spacing.unit,
    },
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
        estimated: null,
        burned: null,
        endPlanned: null
    };
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    setBurned = event => {
        const value = event.target.value || null;
        const properValue = value ? Math.max(value, 0) : null;
        this.setState({burned: properValue});
    }

    setEstimated = event => {
        const value = event.target.value || null;
        const properValue = value ? Math.max(value, 0) : null;
        this.setState({estimated: properValue});
    }

    setEndPlanned = event => {
        const value = event.target.value;
        const properValue = value ? Math.max(value, 0) : null;
        this.setState({endPlanned: properValue});
    }

    isValid = () => {
        const {burned, estimated, endPlanned} = this.state;
        return burned !== null && estimated !== null && endPlanned !== null;
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
                this.props.browserHistory.push(`/overview?project=${projectId}`);
                this.handleClose();
            });
    }

    render() {
        const {classes, sprint, project} = this.props;
        const sprintId = sprint ? sprint.sprintId : null;
        const projectName = project ? project.name : null;

        return (
            
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} disabled={this.props.disabled}>
                    Close sprint
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{projectName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Closing sprint {sprintId}
                        </DialogContentText>
                        <TextField
                            id="estimated-hours"
                            label="Originally estimated work hours"
                            className={classes.textField}
                            value={this.state.estimated}
                            onChange={this.setEstimated}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="end-planned-hours"
                            label="End planned hours"
                            className={classes.textField}
                            value={this.state.endPlanned}
                            onChange={this.setEndPlanned}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="burned-hours"
                            label="Burned hours"
                            className={classes.textField}
                            value={this.state.burned}
                            onChange={this.setBurned}
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
    project: PropTypes.object.isRequired,
    sprint: PropTypes.object.isRequired,
    browserHistory: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloseSprintDialog);
