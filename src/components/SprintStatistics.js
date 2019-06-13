import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {Divider, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CloseSprintDialog from "./CloseSprintDialog";

const styles = theme => ({
    root: {
        float: "left",
        padding: 15,
        paddingRight: 30,
    },
    title: {
        float: "left",
        paddingLeft: 15,
        paddingTop: 5
    },
    button: {
        float: "right",
        marginTop: 5
    },
    header: {
        float: "left",
        width: "100%",
    },
    content: {
        paddingTop: 10,
        clear: "left"
    },
    divider: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    dialogCloseSprint: {
        float: "left",
        marginLeft: 30,
        marginTop: 5
    }
});

const getListItem = (primary, secondary) => {
    return (
        <ListItem>
            {primary}
            <ListItemSecondaryAction>
                {secondary ? secondary.toFixed(2) : "—"}
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const SprintStatistics = (props) => {
    
    
    const {classes, sprint, project, afterCloseUpdateCallback, summariseDisabled} = props;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6" component="h2" className={classes.title}>
                    Details of sprint {sprint.sprintId} {sprint.closingStatus ? "(closed)" : "(open)"}
                </Typography>
                {!summariseDisabled && //TODO am i scrum master
                    <div className={classes.dialogCloseSprint}>
                        <CloseSprintDialog
                            project={project}
                            sprint={sprint}
                            parentUpdateCallback={afterCloseUpdateCallback}
                            disabled={summariseDisabled}
                        />
                    </div>
                }
            </div>

            {sprint &&
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid item xs={4}>
                    <List dense>
                        {getListItem("All declared hours", sprint.allHours)}
                        {getListItem("Expected factor", sprint.factor)}
                        {getListItem("Estimated effective hours", sprint.estimatedEffectiveHours)}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List dense>
                        {getListItem("Original estimated hours", sprint.originalEstimatedHours)}
                        {getListItem("End planned hours", sprint.endPlannedHours)}
                        {getListItem("Burned hours", sprint.burnedHours)}
                    </List>
                </Grid>
                <Grid item xs={4}>
                    <List dense>
                        {getListItem("Effective hours needed", sprint.effectiveHoursNeeded)}
                        {getListItem("Effective sprint factor", sprint.effectiveFactor)}
                        {getListItem("Effective project factor", sprint.effectiveFactorWithHistory)}
                    </List>
                </Grid>
            </Grid>
            }

        </div>
    );
}

SprintStatistics.propTypes = {
    classes: PropTypes.object.isRequired,
    sprint: PropTypes.object,
};

export default withStyles(styles)(SprintStatistics);
