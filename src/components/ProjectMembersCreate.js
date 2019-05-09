import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";
import ProjectMembersAdd from "./ProjectMembersAdd";
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
    dziurka: {
        marginTop: 35,
    }
};

class ProjectMembersCreate extends React.Component {

    renderProjectMembersList = (usersList, toggleScramMasterCallback, removeMemberCallback) => {
        let array = [];
        for(let i = 0; i < usersList.length; i++) {
            array.push(
                <ProjectMembersCreateItem
                    userName={usersList[i].userName}
                    userID={usersList[i].userID}
                    mail={usersList[i].mail}
                    isScrumMaster={usersList[i].isScrumMaster}
                    toggleScrumMasterCallback={(userID) => toggleScramMasterCallback(userID)}
                    removeMemberCallback={(userID) => removeMemberCallback(userID)}
                />
            );
            if(i !== usersList.length - 1) {
                array.push(<Divider light/>)
            }
        }

        return (
            <List className={this.props.classes.membersList}>
                {array}
            </List>
        );
    }

    render() {
        const { classes, usersList, addMemberCallback, toggleScramMasterCallback, removeMemberCallback} = this.props;
        return (
            <div className={classes.root}>

                <ProjectMembersAdd addMemberCallback={(userID) => addMemberCallback(userID)}/>

                <div className={classes.dziurka}>
                </div>

                {/*<Divider/>*/}
                {/*<List className={classes.membersList}>*/}
                {/*    <ProjectMembersCreateItem userName="mateuszek" userID={123} mail="XDD@QWE" isScrumMaster={ true } toggleScrumMasterCallback={(userID) => toggleScramMaster(userID)}/>*/}
                {/*    <Divider light/>*/}
                {/*    <ProjectMembersCreateItem userName="mateuszek" userID={123} mail="XDD@QWE" isScrumMaster={ true } toggleScrumMasterCallback={(userID) => toggleScramMaster(userID)}/>*/}
                {/*    <Divider light/>*/}
                {/*</List>*/}
                {/*<Divider/>*/}

                <Divider/>
                { this.renderProjectMembersList(usersList, toggleScramMasterCallback, removeMemberCallback) }
                <Divider/>

            </div>
        );
    }
}

ProjectMembersCreate.propTypes = {
    usersList: PropTypes.arrayOf(
        PropTypes.shape({
            userID: PropTypes.number,
            userName: PropTypes.string,
            mail: PropTypes.string,
            isScrumMaster: PropTypes.bool,
        })
    ).isRequired,
    addMemberCallback: PropTypes.func.isRequired,
    toggleScramMasterCallback: PropTypes.func.isRequired,
    removeMemberCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProjectMembersCreate);