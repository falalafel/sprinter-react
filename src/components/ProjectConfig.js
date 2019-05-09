import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

const styles = theme => ({
    root: {
        width: 400,
    },
    textField: {
        width: 400,
    },
    addProjectButton: {
        marginTop: theme.spacing.unit * 3,
        width: 400,
        height: 50,
    }
});

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const result = yyyy + '-' + mm + '-' + dd;
    return result
}

class ProjectConfig extends React.Component {

    state = {
        projectName: '',
        startingDate: getCurrentDate(),
        sprintLength: 7,
        startingFactor: 2.5,
        isValid: false,
    };

    validate() {
        const {projectName, startingDate, sprintLength, startingFactor} = this.state;

        const valid = (
            (projectName.trim() !== '') &&
            (startingDate.trim() !== '') &&
            (Number.isInteger(sprintLength)) &&
            (!isNaN(startingFactor))
        )

        this.setState({isValid: valid})
    }

    handleProjectNameChange = (event) => {
        this.setState({projectName: event.currentTarget.value.trim()});
        console.log(this.state.projectName);
        this.validate()
    }

    handleStartingDateChange = (event) => {
        this.setState({startingDate: event.target.value})
        this.validate()
    }

    handleSprintLengthChange = (event) => {
        this.setState({sprintLength: Math.max(1, Math.min(parseInt(event.target.value), 366))})
        this.validate()
    }

    handleStartingFactorChange = (event) => {
        this.setState({startingFactor: Math.max(0.1, Math.min(parseFloat(event.target.value), 10))})
        this.validate()
    }

    render() {
        const {classes} = this.props;
        const {projectName, startingDate, sprintLength, startingFactor, isValid} = this.state;

        return (
            <div className={classes.root}>
                <form className={classes.container} noValidate>
                    <TextField
                        label="Project name"
                        className={classes.textField}
                        margin="normal"
                        error={projectName === ''}
                        value={projectName}
                        onChange={(event) => this.handleProjectNameChange(event)}
                    />
                    <br/>
                    <TextField
                        label="Starting date"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        // defaultValue={startingDate}
                        className={classes.textField}
                        margin="normal"
                        error={startingDate === ''}
                        value={startingDate}
                        onChange={this.handleStartingDateChange}
                    />
                    <br/>
                    <TextField
                        label="Sprint length"
                        type="number"
                        inputProps={{min: '1', max: '366', step: "1"}}
                        className={classes.textField}
                        margin="normal"
                        // defaultValue="7"
                        error={!Number.isInteger(sprintLength)}
                        value={isNaN(sprintLength) ? null : sprintLength}
                        onChange={this.handleSprintLengthChange}
                    />
                    <br/>
                    <TextField
                        label="Starting factor"
                        type="number"
                        inputProps={{min: '0.1', max: '10', step: "0.1"}}
                        className={classes.textField}
                        margin="normal"
                        // defaultValue="2.5"
                        error={!startingFactor}
                        value={isNaN(startingFactor) ? null : startingFactor}
                        onChange={this.handleStartingFactorChange}
                    />
                    <br/>

                </form>
                <Button
                    disabled={!isValid}
                    onClick={() => this.addUserButtonAction()}
                    color="primary"
                    variant="contained"
                    className={classes.addProjectButton}
                >
                    add project
                </Button>
            </div>
        );
    }
}

ProjectConfig.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectConfig);