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

const styles = theme => ({
    root: {
        float: "left",
        minWidth: 350
    },
    title: {
        float: "left",
        paddingLeft: 15,
        paddingTop: 5
    },
    button: {
        float: "left",
        marginLeft: 125
    },
    leftColumn: {
        float: "left",
        paddingRight: 0,
        maxWidth: 200
    },
    rightColumn: {
        float: "right",
        marginLeft: 50
    },
    leftListItem: {
        display: "flex",
        justifyContent:'flex-begin'
    },
    rightListItem: {
        display: "flex",
        justifyContent:'flex-end'
    },
    header: {
        float: "left",
        width: "100%"
    },
    content: {
        paddingTop: 10,
        float: "left"
    }
});

const SprintStatistics = (props) => {

    const {classes, sprint} = props;

    return (

        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6" component="h2" className={classes.title}>
                    Statistics
                </Typography>
                <IconButton size="small" className={classes.button} disabled={sprint === null}>
                    <EditIcon fontSize="small"/>
                </IconButton>
            </div>
      
            
            <div className={classes.content}>
                <List className={classes.leftColumn} dense>
                    <ListItem className={classes.leftListItem}>
                    Status
                    </ListItem>
                    <ListItem className={classes.leftListItem}>
                    Estimated hours
                    </ListItem>
                    <ListItem className={classes.leftListItem}>
                    Planned hours
                    </ListItem>
                    <ListItem className={classes.leftListItem}>
                    Burned hours
                    </ListItem>
                    <ListItem className={classes.leftListItem}>
                    Effective factor
                    </ListItem>
                </List>
                {sprint &&
                    <List className={classes.rightColumn} dense>
                        <ListItem className={classes.rightListItem}>
                        {sprint.closingStatus ? "closed" : "open"}
                        </ListItem>
                        <ListItem className={classes.rightListItem}>
                        {sprint.originalEstimatedHours}
                        </ListItem>
                        <ListItem className={classes.rightListItem}>
                        {sprint.endPlannedHours}
                        </ListItem>
                        <ListItem className={classes.rightListItem}>
                        {sprint.burnedHours}
                        </ListItem>
                        <ListItem className={classes.rightListItem}>
                        {sprint.effectiveFactor}
                        </ListItem>
                    </List>
                }
            </div>
        </div>
    );
}

SprintStatistics.propTypes = {
    classes: PropTypes.object.isRequired,
    sprint: PropTypes.object,
};

export default withStyles(styles)(SprintStatistics);
