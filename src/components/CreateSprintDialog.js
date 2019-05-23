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
        width: '100%',
    },
    button: {
        marginTop: theme.spacing.unit * 4,
    },
    mainButton: {
        float: "left",
    },
    buttonIcon: {
        float: "left",
        paddingRight: 10
    },
});

function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd
}

function isValidDate(strdate){
  var splitdate = strdate.split("-");
  var day = Number(splitdate[2]);
  var month = Number(splitdate[1]);
  var year = Number(splitdate[0]);
  var date = new Date();
  date.setFullYear(year, month - 1, day);
  // month - 1 since the month index is 0-based (0 = January)
  if ((date.getFullYear() === year) && 
      (date.getMonth() === month - 1) && 
      (date.getDate() === day) )
    return true;
  return false;
}

function isAfter(strdate1, strdate2){
  var date1 = new Date();
  var date2 = new Date();
  var date1split = strdate1.split("-");
  var date2split = strdate2.split("-");
  date1.setFullYear(Number(date1split[0]), Number(date1split[1] - 1), Number(date1split[2]));
  date2.setFullYear(Number(date2split[0]), Number(date2split[1] - 1), Number(date2split[2]));
  if(date1 < date2)
    return true
  return false
}

class CreateSprintDialog extends React.Component {

    state = {
        open: false,
        startDate: getCurrentDate(),
        endDate: getCurrentDate(),
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

    createSprint = () => {
        const projectId = this.props.project.projectId;
        const {startDate, endDate} = this.state;

        const data = {
          startDate: startDate,
          endDate: endDate,
        };

        api.fetchNoContent(
            api.endpoints.createSprint(
                projectId,
                data
            ),
            () => {
                this.handleClose();
                this.props.parentUpdateCallback();
            });
    }

    render() {
        const {classes, project} = this.props;
        const projectName = project ? project.name : null;

        return (
            <div>
                <Button variant="contained" color="primary"
                        onClick={this.handleClickOpen}
                        className={classes.mainButton}
                        size='small'
                        disabled={this.props.disabled}>
                    <AddIcon className={classes.buttonIcon} fontSize='small' />
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
                            Creating sprint in project: {projectName}
                        </DialogContentText>
                        <TextField
                        id="start-date"
                        label ="Planned start date for sprint"
                        className={classes.textField}
                        value={this.state.startDate}
                        onChange={this.handleDateChange("startDate")}
                        error={!isValidDate(this.state.startDate)}
                        margin="normal"
                        type="date"
                      />
                      <TextField
                        id="end-date"
                        label ="Planned end date for sprint"
                        className={classes.textField}
                        value={this.state.endDate}
                        onChange={this.handleDateChange("endDate")}
                        error={!isValidDate(this.state.endDate) || !isAfter(this.state.startDate, this.state.endDate)}
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
