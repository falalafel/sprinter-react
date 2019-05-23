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
import {resolve} from "dns";


const styles = theme => ({
    root: {
        float: "left",
    },
    textField: {
        width: "100%",
        height: 60,

    },
    button: {
        marginTop: theme.spacing.unit * 4,
    },
});

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd
}

// function isValidDate(strdate) {
//     var splitdate = strdate.split("-");
//     var day = Number(splitdate[2]);
//     var month = Number(splitdate[1]);
//     var year = Number(splitdate[0]);
//     var date = new Date();
//     date.setFullYear(year, month - 1, day);
//     // month - 1 since the month index is 0-based (0 = January)
//     if ((date.getFullYear() === year) &&
//         (date.getMonth() === month - 1) &&
//         (date.getDate() === day))
//         return true;
//     return false;
// }
//
// function isAfter(strdate1, strdate2) {
//     return new Date(strdate1) > new Date(strdate2)
// }

class CreateSprintDialog extends React.Component {

    state = {
        open: false,
        startDate: getCurrentDate(), //TODO data konca poprzedniego sprintu
        endDate: getCurrentDate(), // TODO startDate + duration of sprint
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDateChange = name => (event) => {
        this.setState({[name]: event.target.value})
    };

    startDateValid = () => {
        return this.state.startDate === ''
    };

    endDateValid = () => {
        return this.state.endDate === '' || new Date(this.state.startDate) >= new Date(this.state.endDate)
    };

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
                console.log(projectId)
                this.handleClose();
                this.props.parentUpdateCallback();
            });
    };

    render() {
        const {classes, project} = this.props;
        const projectName = project ? project.name : null;

        return (
            <div className={classes.root}>
                <Button variant="contained"
                        onClick={this.handleClickOpen}
                        size='small'
                        disabled={this.props.disabled}>
                    <AddIcon className={classes.buttonIcon} fontSize='small'/>
                    New Sprint
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="create-sprint-form"
                >
                    <DialogTitle id="create-sprint-form">New sprint</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Adding a sprint to project {projectName}
                        </DialogContentText>
                        <TextField
                            id="start-date"
                            label="Start date"
                            InputLabelProps={{shrink: true}}
                            className={classes.textField}
                            value={this.state.startDate}
                            onChange={this.handleDateChange("startDate")}

                            // error={this.startDateValid()}
                            helperText={this.startDateValid() ? "chujchujdupacycki" : ""}
                            FormHelperTextProps={{error: this.startDateValid()}}

                            margin="normal"
                            type="date"
                        />
                        <TextField
                            id="end-date"
                            label="End date"
                            InputLabelProps={{shrink: true}}
                            className={classes.textField}
                            value={this.state.endDate}
                            onChange={this.handleDateChange("endDate")}

                            // error={this.endDateValid()}
                            helperText={this.endDateValid() ? "spierdoliles" : ""}
                            FormHelperTextProps={{error: this.endDateValid()}}

                            margin="normal"
                            type="date"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.createSprint} color="primary">
                            Create sprint
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

CreateSprintDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    project: PropTypes.object,
    parentUpdateCallback: PropTypes.func
};

export default withStyles(styles)(CreateSprintDialog);
