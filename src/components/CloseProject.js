import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import api from "../api";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    root: {
        marginTop: 60,
    },
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40
    },
    projectConfig: {
        float: 'right',
        marginRight: '4%',
    },
    projectMembers: {
        float: 'left',
        marginLeft: '4%',
    },
    closeProjectButton: {
        marginTop: theme.spacing.unit * 3,
        width: 400,
        height: 50,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd
}

class CloseProject extends React.Component {
    state = {
        // users list component
        //usersList: [],
        //members: [],
        // project configuration component
        projectName: '',
        endingDate: getCurrentDate(),
    };

    handleCloseProjectButton = () => {
        const {classes, projectName, redirectToDashboardCallback} = this.props;

        const data = {
            name: projectName,
            endDate: this.state.endingDate,
        };

        api.fetch(
            api.endpoints.closeProject(projectName, data),
            () => {
                this.props.redirectToDashboardCallback();
            });
    };

    render() {

        const {classes, projectName, redirectToDashboardCallback} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={0} justify='center'>
                    <Grid item xs={12}>
                        <div className={classes.title}>
                            <Typography variant="h3">
                                Close project
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <Button
                                onClick={this.handleCloseProjectButton}
                                color="primary"
                                variant="contained"
                                className={classes.closeProjectButton}
                            >
                                Close project
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

CloseProject.propTypes = {
    classes: PropTypes.object.isRequired,
    projectName: PropTypes.string,
    redirectToDashboardCallback: PropTypes.func,
};

export default withStyles(styles)(CloseProject);