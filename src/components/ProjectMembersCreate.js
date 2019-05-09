import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";
import ProjectMembersAdd from "./ProjectMembersAdd";
import PropTypes from "prop-types";
import List from '@material-ui/core/List/index';
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
    divider: {
        marginTop: 35,
    }
};

class ProjectMembersCreate extends React.Component {

    renderProjectMembersList = () => {

        const array = this.props.members.map(({
            name,
            userId,
            mail,
            isScrumMaster
        }) => (
            <ProjectMembersCreateItem
                userName={name}
                userId={userId}
                mail={mail}
                isScrumMaster={isScrumMaster}
                toggleScrumMasterCallback={(userId) => this.props.toggleScrumMasterCallback(userId)}
                removeMemberCallback={(userId) => this.props.removeMemberCallback(userId)}
            />
        ))

        return (
            <List className={this.props.classes.membersList}>
                {array}
            </List>
        );
    }

    render() {
        const { classes, members, notMembers, addMemberCallback, toggleScrumMasterCallback, removeMemberCallback} = this.props;

        return (
            <div className={classes.root}>

                <ProjectMembersAdd users={notMembers} addMemberCallback={(userId) => addMemberCallback(userId)}/>
                <Divider className={classes.divider}/>
                { this.renderProjectMembersList(members, toggleScrumMasterCallback, removeMemberCallback) }
                { members.length > 0 ? <Divider/> : null }

            </div>
        );
    }
}

ProjectMembersCreate.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number,
            userName: PropTypes.string,
            mail: PropTypes.string,
            isScrumMaster: PropTypes.bool,
        })
    ).isRequired,
    notMembers: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number,
            userName: PropTypes.string,
            mail: PropTypes.string,
        })
    ).isRequired,
    addMemberCallback: PropTypes.func.isRequired,
    toggleScrumMasterCallback: PropTypes.func.isRequired,
    removeMemberCallback: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProjectMembersCreate);