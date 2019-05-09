import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";
import ProjectMembersAdd from "./ProjectMembersAdd";
import PropTypes from "prop-types";
import List from '@material-ui/core/List/index';
import PeopleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Divider} from "@material-ui/core";
import ProjectMembersCreate from "./ProjectMembersCreate";

const tempUsers = [
    { userId: 1, name: "John Snow", mail: "dick@company.com" },
    { userId: 2, name: "Nicky Snow", mail: "dicky@company.com" },
    { userId: 3, name: "Harold Snow", mail: "dickold@company.com" },
    { userId: 4, name: "Mike Snow", mail: "dicke@company.com" },
    { userId: 5, name: "Stephen Snow", mail: "dickhen@company.com" },
    { userId: 6, name: "Caroline Snow", mail: "dickline@company.com" },
    { userId: 7, name: "Joshua Snow", mail: "dickua@company.com" },
    { userId: 8, name: "Mary-Anne Snow", mail: "dick-anne@company.com" },
];

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

// function addMember(userId) {
//     console.log("add member func");
//     console.log({userId});
// }

// // function toggleScramMaster(userId) {
// //
// // }

// function removeMember(userId) {
//     console.log("remove member func")
//     console.log({userId})
// }

class MotherComponent12 extends React.Component {

    state = {
        usersList: tempUsers,
        members: [], // list of dicts { ...user, isScrumMaster: bool }
    };


    toggleScrumMaster = (userId) => {
        console.log("toggle ${userId}")

        this.setState({members: this.state.members.map(
            user => user.userId === userId ? ({
                ...user,
                isScrumMaster: !user.isScrumMaster
            }) : user
        )})
    }

    removeMember = (userId) => {
        console.log("remove ${userId}")

        this.setState({members: this.state.members.filter(
            user => userId != user.userId
        )})
    }

    addMember = (userId) => {
        console.log("add ", userId)

        const newMember = this.state.usersList.find(u => u.userId === userId)
        this.setState({members: [newMember].concat(this.state.members)})
    }

    // constructor(props) {
    //     super(props)
    //     console.log("chuj ");
    //     console.log(this.state.members);
    //     console.log(this.props);
    // }

    render() {
        const { classes } = this.props;
        const { members, usersList } = this.state;

        const notMembers = usersList.filter(user => (
           !members.map(m => m.userId).includes(user.userId)
        ))

        return (
            <div className={classes.root}>

                <ProjectMembersCreate
                    members={members}
                    notMembers={notMembers}
                    addMemberCallback={ (userId) => this.addMember(userId) }
                    toggleScrumMasterCallback={ (userId) => this.toggleScrumMaster(userId) }
                    removeMemberCallback={ (userId) => this.removeMember(userId) }
                />

            </div>
        );
    }
}

// MotherComponent12.propTypes = {
//     user

// };

export default withStyles(styles)(MotherComponent12);