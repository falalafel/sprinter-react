import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import {Divider, Paper, IconButton, Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        float: "left",
        padding: 15,
        paddingRight: 30
    },
    title: {
        float: "left",
        paddingLeft: 15,
        paddingTop: 5
    },
    button: {
        float: "right",
    },
    editIcon: {
        marginRight: 10
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
    }
});

const getListItem = (primary, secondary) => {
    return (
        <ListItem>
            {primary}
            <ListItemSecondaryAction>
                {secondary}
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const SprintStatistics = (props) => {
    
    const {classes, sprint} = props;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6" component="h2" className={classes.title}>
                    Details of sprint {sprint.sprintId}
                </Typography>
                <Button size="small" className={classes.button} disabled={sprint === null}>
                    <EditIcon fontSize="small" className={classes.editIcon}/>
                    Edit
                </Button>
            </div>

            {sprint &&
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid item xs={3}>
                    <List dense>
                        {getListItem("Status", sprint.closingStatus ? "closed" : "open")} {/*// TODO: status future | in progress | not summarised | summarised */}
                        {getListItem("All declared hours", null)} {/*// TODO: counting hours sum in backend */}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <List dense>
                        {getListItem("Expected factor", sprint.factor)}
                        {getListItem("Estimated effective hours", null)} {/* TODO: calculations in backend */}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <List dense> {/*// TODO: whole column */}
                        {getListItem("Original estimated hours", sprint.originalEstimatedHours)}
                        {getListItem("End planned hours", sprint.endPlannedHours)}
                        {getListItem("Burned hours", sprint.burnedHours)}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <List dense> {/*// TODO: whole column */}
                        {getListItem("Effective hours needed", null)} {/*// TODO: weird calculations in backend */}
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
