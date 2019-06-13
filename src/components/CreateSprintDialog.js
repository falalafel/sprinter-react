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
    },
    button: {
        float: "right"
    }
});

const addDaysToDate = (date, days) => {
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

const dateToString = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd
};

class CreateSprintDialog extends React.Component {

    state = {
        open: false,
        startDate: '',
        endDate: '',
        estimated: "",
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
            startDate: invalidChange ? dateToString(minDate) : dateToString(newStartDate),
            showStartDateError: invalidChange
        })

        if (endDate && endDate < newStartDate)
            this.setState({
                endDate: dateToString(newStartDate)
            })
    }

    handleEndDateChange = event => {
        const newEndDate = new Date(event.target.value)
        const startDate = new Date(this.state.startDate)
        const minDate = this.props.defaultStartDate

        if (newEndDate < minDate) {
            this.setState({
                endDate: dateToString(minDate),
                startDate: dateToString(minDate),
                showStartDateError: true,
            })
        }

        else if (newEndDate < startDate) {
            this.setState({
                endDate: dateToString(newEndDate),
                startDate: dateToString(newEndDate),
                showStartDateError: false,
            })
        }

        else {
            this.setState({
                endDate: dateToString(newEndDate),
                showStartDateError: false,
            })
        }
    }

    setNonNegativeValue = name => event => {
        const value = event.target.value || null;
        const properValue = value !== null ? Math.max(value, 0) : "";
        this.setState({[name]: properValue});
    };

    getErrorMessage() {
        const project = this.props.project;
        const {startDate} = this.state;

        const projectStart = new Date(project.startDate);
        const sprintStart = new Date(startDate);

        return projectStart < sprintStart ?
            'Sprint cannot start before the previous one ends' : 
            'Sprint cannot start before the project starts'
    }

    submitButtonValid() {
        const {startDate, endDate, estimated} = this.state;
        const parsedStartDate = new Date(startDate);
        const parsedEndDate = new Date(endDate);
        
        return !isNaN(parsedStartDate) && !isNaN(parsedEndDate) && estimated !== "";
    }

    createSprint = () => {
        const projectId = this.props.project.projectId;
        const {startDate, endDate, estimated} = this.state;

        const data = {
            startDate: startDate,
            endDate: endDate,
            originalEstimatedHours: estimated,
        };

        // TODO wait for backend fix
        api.fetch(
            api.endpoints.createSprint(
                projectId,
                data
            ),
            (response) => {
                console.log(response)
                const sprintId = response[1]
                this.handleClose();
                this.props.parentUpdateCallback();
                this.props.history.push(`/overview?project=${projectId}&sprint=${sprintId}`)
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {defaultStartDate, project} = this.props;
        
        if (prevProps.defaultStartDate !== defaultStartDate) {
            this.setState({
                startDate: project ? dateToString(defaultStartDate) : '',
                endDate: project ? dateToString(addDaysToDate(defaultStartDate, project.sprintDuration)) : '',
            })
        }
    }

    render() {
        const {classes, project} = this.props;
        const projectName = project ? project.name : null;

        return (
            <div>
                <Button className={classes.button}
                        variant="outlined"
                        onClick={this.handleClickOpen}
                        size='small'
                        disabled={this.props.disabled}>
                    <AddIcon fontSize='small'/>
                    New
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

                            helperText={this.state.showStartDateError ? this.getErrorMessage() : ''}

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
                        <TextField
                            id="estimated-hours"
                            label="Originally estimated work hours"
                            className={classes.textField}
                            value={this.state.estimated}
                            onChange={this.setNonNegativeValue("estimated")}
                            margin="normal"
                            type="number"
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
    defaultStartDate: PropTypes.object,
    history: PropTypes.object,
};

export default withStyles(styles)(CreateSprintDialog);
