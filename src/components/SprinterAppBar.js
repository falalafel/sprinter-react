import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dashboard from "./Dashboard";
import AddProject from "./AddProject";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    core: {
        marginTop: 65,
    },
    appBar: {
        height: 65,
    },
};

class SprinterAppBar extends React.Component {

    state = {
        open: false,
        renderDashboard: true,
        renderAddProject: false,
    };

    handleAddProject = () => {
        this.props.history.push('/new-project/')
    };

    handleOverview = () => {
        this.props.history.push('/overview/')
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Sprinter
                        </Typography>
                        <Button color="inherit" onClick={this.handleOverview}>Overview</Button>
                        <Button color="inherit" onClick={this.handleAddProject}>New Project</Button>
                        <Button color="inherit">Calendar</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

SprinterAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SprinterAppBar);
