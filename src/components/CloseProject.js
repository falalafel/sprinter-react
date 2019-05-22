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
        display: 'block',
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


class CloseProject extends React.Component {

    state = {};

    componentDidMount() {
        this.props.buttonDisableCallback()
    }

    render() {
        const {classes, projectId, project, closeCloseProject, closeProjectCallback} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <form className={classes.container} noValidate>
                        <Typography variant="h3">
                            Close Project
                        </Typography>
                        <TextField
                            id="project-name"
                            label="Project Name"
                            className={classes.textField}
                            value={project.name}
                            margin="normal"
                            type="text"
                        />
                        <TextField
                            id="project-id"
                            label="Project Id"
                            className={classes.textField}
                            value={projectId}
                            margin="normal"
                            type="text"
                        />
                        <TextField
                            id="start-time"
                            label="Start time"
                            className={classes.textField}
                            value={project.startDate}
                            margin="normal"
                            type="text"
                        />
                    </form>
                    <Button variant="contained" color="primary"
                            onClick={() => closeProjectCallback({
                                closingStatus: true
                            })}>Close Project</Button>
                </Paper>
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={closeCloseProject}>Close</Button>
            </main>
        );
    }

}

CloseProject.propTypes = {
    classes: PropTypes.object.isRequired,
    projectId: PropTypes.number,
    project: PropTypes.object,
    closeCloseProject: PropTypes.func,
    closeProjectCallback: PropTypes.func.isRequired,
    buttonDisableCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(CloseProject);