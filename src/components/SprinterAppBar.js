import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from "./Dashboard";
import AddProject from "./AddProject";

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
        renderDashboard: true,
        renderAddProject: false,
    };

    handleRenderDashboard = () => {
        this.setState({renderDashboard: true, renderAddProject: false})
    };

    handleRenderAddProject = () => {
        this.setState({renderDashboard: false, renderAddProject: true})
    };

    handleRedirectToDashboard = () => {
        this.setState({renderDashboard: true, renderAddProject: false})
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
                        <Button color="inherit" onClick={this.handleRenderDashboard}>Overview</Button>
                        <Button color="inherit" onClick={this.handleRenderAddProject}>New Project</Button>
                        <Button color="inherit">Calendar</Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.core}>
                    {this.state.renderDashboard ? <Dashboard/> : null}
                    {this.state.renderAddProject ? <AddProject redirectToDashboardCallback={() => this.handleRedirectToDashboard()}/> : null}
                </div>
            </div>
        );
    }
}

SprinterAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SprinterAppBar);
