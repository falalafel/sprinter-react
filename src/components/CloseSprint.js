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

class CloseSprint extends React.Component {

    state = {
        effectiveTime: 0,
        burntTime: 0,
    };

    // componentDidMount() {
    //     this.props.buttonDisableCallback()
    // }

    render() {
        const {classes} = this.props;
        const {projectId, sprintId} = this.props.match.params;

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <form className={classes.container} noValidate>
                        <Typography variant="h3">
                            Close Sprint
                        </Typography>
                        <Typography variant="h4">
                            {projectId}
                        </Typography>
                        <Typography variant="h5">
                            {sprintId}
                        </Typography>
                        <TextField
                            id="effective-time"
                            label="Effective time"
                            className={classes.textField}
                            value={this.state.effectiveTime}
                            onChange={event => this.setState({effectiveTime: event.target.value})}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            id="burnt-time"
                            label="Burnt time"
                            className={classes.textField}
                            value={this.state.burntTime}
                            onChange={event => this.setState({burntTime: event.target.value})}
                            margin="normal"
                            type="number"
                        />
                    </form>
                    <Button variant="contained" color="primary">
                        Close Sprint
                    </Button>
                </Paper>
                <Button variant="contained" color="primary" className={classes.button}
                        onClick={() => this.props.history.push(`/overview?project=${projectId}&sprint=${sprintId}`)}>
                    Cancel
                </Button>
            </main>
        );
    }

}

CloseSprint.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CloseSprint);