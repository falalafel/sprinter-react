import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";
import ProjectMemberAdd from "./ProjectMemberAdd";
import PropTypes from "prop-types";
import List from '@material-ui/core/List/index';
import PeopleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Divider} from "@material-ui/core";



const styles = {
    root: {
        maxWidth: 500,
        minWidth: 500,
        padding: 15,
    },
    membersList: {
        maxHeight: 400,
        overflow: 'auto',
    },
    dudududuuupa: {
        marginTop: 35,
    }
};

function addMemberCallback(userID) {
    console.log("udauo sie");
    console.log({userID});
}

function toggleScramMaster(userID) {
    console.log("toggled SM")
    console.log({userID})
}

function removeMember(userID) {
    console.log("removed member")
    console.log({userID})
}

class TestComponent extends React.Component {


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <ProjectMemberAdd addMemberCallback={(userID) => addMemberCallback(userID)}/>

                <div className={classes.dudududuuupa}>
                </div>

                <Divider/>
                <List className={classes.membersList}>
                    <ProjectMembersCreateItem userName="mateuszek" userID={123} mail="XDD@QWE" isScrumMaster={ true } toggleScrumMasterCallback={(userID) => toggleScramMaster(userID)}/>
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="mateuszek" mail="XDD@QWE" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                    <Divider light/>
                    <ProjectMembersCreateItem userName="kubusz" mail="rak@srak" isScrumMaster={ true } />
                </List>
                <Divider/>


            </div>
        );
    }
}

export default withStyles(styles)(TestComponent);