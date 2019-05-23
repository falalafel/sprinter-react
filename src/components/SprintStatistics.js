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
import {Divider, Paper, IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
    root: {
        float: "left",
        padding: 15
    },
    title: {
        float: "left",
        paddingLeft: 15,
        paddingTop: 5
    },
    button: {
        float: "right",
        marginLeft: 125
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
                    Details {sprint ? `of sprint ${sprint.sprintId}` : `...`}
                </Typography>
                <IconButton size="small" className={classes.button} disabled={sprint === null}>
                    <EditIcon fontSize="small"/>
                </IconButton>
            </div>

            {sprint &&
            <Grid container>
                <Grid item xs={12}>
                    <Divider className={classes.divider}/>
                </Grid>
                <Grid item xs={3}>
                    <List dense>
                        {getListItem("Id", sprint.sprintId)}
                        {getListItem("Status", "in progress")} {/*// TODO: status future | in progress | not summarised | summarised */}
                        {/* {getListItem("Start date", sprint.startDate)}
                            {getListItem("End date", sprint.endDate)} */}
                        {getListItem("All declared hours", "128")} {/*// TODO: counting declared hours in parent component */}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <List dense>
                        {getListItem("Expected factor", "2.44")} {/* factor from previous sprint */}
                        {getListItem("Estimated effective hours", "52.46")} {/* declared / factor */}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <List dense> {/*// TODO: whole column */}
                        {getListItem("Original estimated hours", "30")}
                        {getListItem("End planned hours", "45")}
                        {getListItem("Burned hours", "43")}
                    </List>
                </Grid>
                <Grid item xs={3}>
                    <List dense> {/*// TODO: whole column */}
                        {getListItem("Effective hours needed", "52")}
                        {getListItem("Effective sprint factor", "3.42")}
                        {getListItem("Effective project factor", "3.20")}
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
