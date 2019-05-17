import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
    root: {
        width: 400,
    },
    textField: {
        width: 400,
    },
});

class ProjectConfig extends React.Component {

    render() {
        const {classes} = this.props;
        const {
            projectName, startingDate, sprintLength, startingFactor,
            projectNameChangeCallback,
            startingDateChangeCallback,
            sprintLengthChangeCallback,
            startingFactorChangeCallback,
        } = this.props;

        return (
            <div className={classes.root}>
                <form className={classes.container} noValidate>
                    <TextField
                        label="Project name"
                        className={classes.textField}
                        margin="normal"
                        error={projectName === ''}
                        value={projectName}
                        onChange={projectNameChangeCallback}
                    />
                    <br/>
                    <TextField
                        label="Starting date"
                        type="date"
                        InputLabelProps={{shrink: true}}
                        className={classes.textField}
                        margin="normal"
                        error={startingDate === ''}
                        value={startingDate}
                        onChange={startingDateChangeCallback}
                    />
                    <br/>
                    <TextField
                        label="Sprint length"
                        type="number"
                        inputProps={{min: '1', max: '366', step: "1"}}
                        className={classes.textField}
                        margin="normal"
                        error={!Number.isInteger(sprintLength)}
                        value={isNaN(sprintLength) ? '' : sprintLength}
                        onChange={sprintLengthChangeCallback}
                    />
                    <br/>
                    <TextField
                        label="Starting factor"
                        type="number"
                        inputProps={{min: '0.1', max: '10', step: "0.1"}}
                        className={classes.textField}
                        margin="normal"
                        error={!startingFactor}
                        value={isNaN(startingFactor) ? '' : startingFactor}
                        onChange={startingFactorChangeCallback}
                    />
                    <br/>

                </form>
            </div>
        );
    }
}

ProjectConfig.propTypes = {
    classes: PropTypes.object.isRequired,
    projectName: PropTypes.string,
    startingDate: PropTypes.string,
    sprintLength: PropTypes.number,
    startingFactor: PropTypes.number,
    projectNameChangeCallback: PropTypes.func,
    startingDateChangeCallback: PropTypes.func,
    sprintLengthChangeCallback: PropTypes.func,
    startingFactorChangeCallback: PropTypes.func,
};

export default withStyles(styles)(ProjectConfig);