import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreateItem from "./ProjectMembersCreateItem";
import ProjectMembersAdd from "./ProjectMembersAdd";
import PropTypes from "prop-types";
import List from '@material-ui/core/List/index';
import PeopleIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Divider} from "@material-ui/core";
import ProjectMembersCreate from "./ProjectMembersCreate";



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

function addMember(userID) {
    console.log("add member func");
    console.log({userID});
}

// function toggleScramMaster(userID) {
//
// }

function removeMember(userID) {
    console.log("remove member func")
    console.log({userID})
}

class MotherComponent12 extends React.Component {

    state = {
        usersList: [],
    };


    toggleScramMaster = (userID) => {
        console.log("toggle sm func")
        console.log(userID)
        console.log( this.state.usersList[0].mail )
    }

    constructor(props) {
        super(props);
        let array = [
        {
            userID: 0,
            userName: "xdd",
            mail: "xdd@gmail.com",
            isScrumMaster: true,
        },
        {
            userID: 1,
            userName: "XDD",
            mail: "dupa@gmail.com",
            isScrumMaster: false,
        },
        {
            userID: 2,
            userName: "xdd",
            mail: "dupa@gmail.com",
            isScrumMaster: true,
        },
        {
            userID: 3,
            userName: "XDD",
            mail: "dupa@gmail.com",
            isScrumMaster: false,
        },
        {
            userID: 4,
            userName: "xdd",
            mail: "dupa@gmail.com",
            isScrumMaster: true,
        },
        {
            userID: 5,
            userName: "XDD",
            mail: "xdd@gmail.com",
            isScrumMaster: false,
        },
        {
            userID: 6,
            userName: "XDD",
            mail: "dupa@gmail.com",
            isScrumMaster: true,
        },
        {
            userID: 7,
            userName: "XDD",
            mail: "dupa@gmail.com",
            isScrumMaster: false,
        },
        {
            userID: 8,
            userName: "xdd",
            mail: "dupa@gmail.com",
            isScrumMaster: true,
        },
        {
            userID: 9,
            userName: "XDD",
            mail: "xdd@gmail.com",
            isScrumMaster: false,
        },
        ];

        this.state = {usersList: array};
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>

                <ProjectMembersCreate
                    usersList={this.state.usersList}
                    addMemberCallback={ (userID) => addMember(userID) }
                    toggleScramMasterCallback={ (userID) => this.toggleScramMaster(userID) }
                    removeMemberCallback={ (userID) => removeMember(userID) }
                />

            </div>
        );
    }
}

MotherComponent12.propTypes = {
    projectID: PropTypes.number,
};

export default withStyles(styles)(MotherComponent12);