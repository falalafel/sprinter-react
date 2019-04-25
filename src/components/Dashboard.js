import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import Drawer from '@material-ui/core/Drawer/index';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import List from '@material-ui/core/List/index';
import Typography from '@material-ui/core/Typography/index';
import Divider from '@material-ui/core/Divider/index';
import IconButton from '@material-ui/core/IconButton/index';
import Badge from '@material-ui/core/Badge/index';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import SimpleSelect from "./SimpleSelect";
import api from "../api";
import styles from "./Dashboard.styles";

function declarationListItem(declaration) {
    return {id: declaration.userId,
        name: declaration.userId,
        calories: declaration.hoursAvailable,
        fat: declaration.workNeeded,
        protein: declaration.comment};
}

function projectListItem(project) {
    return {id: project.projectId, label: project.name}
}

function sprintListItem(sprint) {
    return {id: sprint.sprintId, label: sprint.sprintId}
}


class Dashboard extends React.Component {
    state = {
        open: true,
        activeProjectId: null,
        activeSprintId: null,
        projects: [],
        sprints: [],
        declarations: [],
    };

    fetchAndSetProjects() {
        api.fetch(
            api.endpoints.getProjects().path,
            (response) => {
                this.setState({projects: response})
            });
    }

    fetchAndSetSprint() {
        api.fetch(
            api.endpoints.getSprints(this.state.activeProjectId).path,
            (response) => {
                this.setState({sprints: response})
            });
    }

    fetchAndSetDeclarations() {
        api.fetch(
            api.endpoints.getDeclarations(this.state.activeProjectId, this.state.activeSprintId).path,
            (response) => {
                this.setState({declarations: response})
            });
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    setActiveProject = (projectId) => {
        this.setState({activeProjectId: projectId})
    };

    setActiveSprint = (sprintId) => {
        this.setState({activeSprintId: sprintId})
    };

    componentDidMount() {
        this.fetchAndSetProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.activeProjectId !== prevState.activeProjectId) {
            this.fetchAndSetSprint()
        } else if(this.state.activeSprintId !== prevState.activeSprintId) {
            this.fetchAndSetDeclarations()
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Sprinter
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{mainListItems}</List>
                    <Divider/>
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Typography variant="h5" gutterBottom component="h2">
                        Projects Overview
                    </Typography>
                    <SimpleSelect
                        label={'project'}
                        itemListCallback={this.setActiveProject}
                        itemList={this.state.projects.map(item => projectListItem(item))}/>
                    <Typography variant="h5" gutterBottom component="h2">
                        Sprints Overview
                    </Typography>
                    <SimpleSelect
                        label={'sprint'}
                        itemListCallback={this.setActiveSprint}
                        itemList={this.state.sprints.map(item => sprintListItem(item))}/>
                    <Typography variant="h4" gutterBottom component="h2">
                        Reported hours
                    </Typography>
                    <div className={classes.tableContainer}>
                        <SimpleTable data={this.state.declarations.map(item => declarationListItem(item))}/>
                    </div>
                    <Typography variant="h4" gutterBottom component="h2">
                        Factor chart
                    </Typography>
                    <Typography component="div" className={classes.chartContainer}>
                        <SimpleLineChart/>
                    </Typography>
                </main>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);