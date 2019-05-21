import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Typography} from "@material-ui/core";

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

function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd
}

class CloseSprint extends React.Component {

  state = {
      startDate: getCurrentDate(),
      endDate: 'yyyy-mm-dd',
  };

  componentDidMount() {
      this.props.buttonDisableCallback()
  };

  handleStartDateChange = (event) => {
    this.setState({startDate: event.target.value})
  };

  handleEndDateChange = (event) => {
    this.setState({endDate: event.target.value})
  };

  handleCreateSprintButton = () => {
    const data = this.state;

    api.fetch(
        api.endpoints.createSprint(this.props.projectId, data),
        () => {
            //this.props.redirectToDashboardCallback();
        });
  };

  render() {
      const {classes, projectName, createSprintCallback} = this.props;

      return (
          <main className={classes.main}>
              <CssBaseline/>
                  <form className={classes.container} noValidate>
                      <Typography variant="h3">
                          Create Sprint
                      </Typography>
                      <Typography variant="h4">
                          {projectName}
                      </Typography>
                      <TextField
                        label="start-date"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        className={classes.textField}
                        margin="normal"
                        error={startDate === ''}
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      <TextField
                        label="end-date"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        className={classes.textField}
                        margin="normal"
                        error={endDate === ''}
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                  </form>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={this.handleCreateSprintButton}
                  >
                    Create Sprint
                  </Button>
          </main>
      );
  }
}

CloseSprint.propTypes = {
  classes: PropTypes.object.isRequired,
  projectName: PropTypes.number,
  projectId: PropTypes.projectId,
  createSprintCallback: PropTypes.func.isRequired,
  buttonDisableCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(CloseSprint);