import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";
import ProjectMemberAdd from "./ProjectMemberAdd";
import PropTypes from "prop-types";
import List from '@material-ui/core/List/index';
import PeopleIcon from "@material-ui/core/SvgIcon/SvgIcon";



const styles = {
    root: {
        maxWidth: 500,
        minWidth: 500,
    }
};

function addMemberCallback(userID) {
    console.log("udauo sie");
    console.log({userID});
}


class TestComponent extends React.Component {


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <ProjectMemberAdd addMemberCallback={(userID) => addMemberCallback(userID)}/>

                it be working

                <List>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(TestComponent);