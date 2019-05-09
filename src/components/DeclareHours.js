import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
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
});

class DeclareHours extends React.Component {

    state = {
        hoursAvailable: 0,
        workNeeded: 0,
        comment: "",
    };

    render() {
        const {classes, projectName, sprintId, closeDeclareHours, declareCallback} = this.props;

        return (
            <main className={classes.main}>
                <Button variant="contained" color="primary" onClick={closeDeclareHours}>Close</Button>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <form className={classes.container} noValidate>
                        <Typography variant="h3">
                            Declare Hours
                        </Typography>
                        <Typography variant="h4">
                            {projectName}
                        </Typography>
                        <Typography variant="h5">
                            {sprintId}
                        </Typography>
                        <TextField
                            id="standard-name"
                            label="Available hours"
                            className={classes.textField}
                            value={this.state.hoursAvailable}
                            onChange={event => this.setState({hoursAvailable: event.target.value})}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="date"
                            label="Work needed"
                            value={this.state.workNeeded}
                            className={classes.textField}
                            onChange={event => this.setState({workNeeded: event.target.value})}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="standard-number"
                            label="Comment"
                            value={this.state.comment}
                            onChange={event => this.setState({comment: event.target.value})}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </form>
                    <Button variant="contained" color="primary"
                            onClick={() => declareCallback({
                                hoursAvailable: this.state.hoursAvailable,
                                workNeeded: this.state.workNeeded,
                                comment: this.state.comment})}>Declare Hours</Button>
                </Paper>
            </main>
        );
    }

}

DeclareHours.propTypes = {
    classes: PropTypes.object.isRequired,
    projectName: PropTypes.number,
    sprintId: PropTypes.number,
    closeDeclareHours: PropTypes.func,
    declareCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(DeclareHours);
