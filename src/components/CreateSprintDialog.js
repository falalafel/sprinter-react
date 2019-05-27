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
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    textField: {
        width: "100%",
        height: 60
    },
    dialogSubtitle: {
        marginBottom: 10
    }
});

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.simpleFormat = function() {
    const dd = String(this.getDate()).padStart(2, '0');
    const mm = String(this.getMonth() + 1).padStart(2, '0');
    const yyyy = this.getFullYear();

    return yyyy + '-' + mm + '-' + dd
}

class CreateSprintDialog extends React.Component {

    state = {
        open: false,
        startDate: '',
        endDate: '',
        showStartDateError: false,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            open: false,
            showStartDateError: false
        });
    };

    handleStartDateChange = event => {
        const newStartDate = new Date(event.target.value)
        const minDate = this.props.defaultStartDate
        const endDate = new Date(this.state.endDate)

        const invalidChange = newStartDate < minDate
        this.setState({
            startDate: invalidChange ? minDate.simpleFormat() : newStartDate.simpleFormat(),
            showStartDateError: invalidChange
        })

        if (endDate && endDate < newStartDate)
            this.setState({
                endDate: newStartDate.simpleFormat()
            })
    }

    handleEndDateChange = event => {
        const newEndDate = new Date(event.target.value)
        const startDate = new Date(this.state.startDate)
        const minDate = this.props.defaultStartDate

        if (newEndDate < minDate) {
            this.setState({
                endDate: minDate.simpleFormat(),
                startDate: minDate.simpleFormat(),
                showStartDateError: true,
            })
        }

        else if (newEndDate < startDate) {
            this.setState({
                endDate: newEndDate.simpleFormat(),
                startDate: newEndDate.simpleFormat(),
                showStartDateError: false,
            })
        }

        else {
            this.setState({
                endDate: newEndDate.simpleFormat(),
                showStartDateError: false,
            })
        }
    }

    submitButtonValid() {
        const {startDate, endDate} = this.state;
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        return !isNaN(parsedStartDate) && !isNaN(parsedEndDate);
    }

    createSprint = () => {
        const projectId = this.props.project.projectId;
        const {startDate, endDate} = this.state;

        const data = {
            startDate: startDate,
            endDate: endDate,
        };

        // TODO wait for backend fix
        api.fetch(
            api.endpoints.createSprint(
                projectId,
                data
            ),
            (projectId) => {
                this.handleClose();
                this.props.parentUpdateCallback();
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {defaultStartDate, project} = this.props;
        
        if (prevProps.defaultStartDate != defaultStartDate) {
            this.setState({
                startDate: project ? defaultStartDate.simpleFormat() : '',
                endDate: project ? defaultStartDate.addDays(project.sprintDuration).simpleFormat() : '',
            })
        }
    }

    render() {
        const {classes, project} = this.props;
        const projectName = project ? project.name : null;

        return (
            <div>
                <Button variant="outlined"
                        onClick={this.handleClickOpen}
                        size='small'
                        disabled={this.props.disabled}>
                    <AddIcon fontSize='small'/>
                    New Sprint
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="create-sprint-form"
                    PaperProps={{style: {width: 450}}}
                >
                    <DialogTitle id="create-sprint-form">New sprint</DialogTitle>
                    <DialogContent>
                        <DialogContentText className={classes.dialogSubtitle}>
                            Creating a sprint in project {projectName}
                        </DialogContentText>
                        <TextField
                            id="start-date"
                            label="Start date"
                            InputLabelProps={{shrink: true}}
                            className={classes.textField}
                            value={this.state.startDate}
                            onChange={this.handleStartDateChange}

                            helperText={this.state.showStartDateError ? 'Sprint cannot start before the previous one ends' : ''}

                            margin="normal"
                            type="date"
                        />
                        <TextField
                            id="end-date"
                            label="End date"
                            InputLabelProps={{shrink: true}}
                            className={classes.textField}
                            value={this.state.endDate}
                            onChange={this.handleEndDateChange}

                            margin="normal"
                            type="date"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.createSprint} color="primary" disabled={!this.submitButtonValid()}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

CreateSprintDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    project: PropTypes.object,
    parentUpdateCallback: PropTypes.func,
    defaultStartDate: PropTypes.object
};

export default withStyles(styles)(CreateSprintDialog);
