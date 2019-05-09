import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

function ProjectConfig(props) {
    const { classes } = props;

    const [age, setGreeting] = useState(0);

    const [name, setName] = useState('New Project');

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
        <form className={classes.container} noValidate>
            <Typography variant="h4">
                New Project
            </Typography>
            <TextField
                id="standard-name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={event => setName(event.target.value)}
                margin="normal"
            />
            <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue="2019-05-24"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="standard-number"
                label="Number"
                value={age}
                onChange={event => setGreeting(event.target.value)}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
            <TextField
                id="standard-number2"
                label="Number"
                value={age}
                onChange={event => setGreeting(event.target.value)}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
        </form>
            <Button variant="contained" color="primary">Add Project</Button>
            </Paper>
        </main>
    );
}

ProjectConfig.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectConfig);