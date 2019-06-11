import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreate from "./ProjectMembersCreate";
import api from "../api";
import ProjectConfig from "./ProjectConfig";
import {Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {resolve} from 'dns';

const styles = (theme) => ({
    root: {},
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40
    },
    projectConfig: {
        float: 'right',
        marginRight: '4%',
    },
    projectMembers: {
        float: 'left',
        marginLeft: '4%',
    },
    addProjectButton: {
        marginTop: theme.spacing.unit * 3,
        width: 400,
        height: 50,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class UserPanel extends React.Component {

    state = {
        loading: true,
        name: '',
        mail: '',

    };

    componentDidMount() {
        this.fetchAndSetUser()
    }

    getUserId() {
        return JSON.parse(localStorage.getItem('user')).userId
    }

    fetchAndSetUser() {
        localStorage.getItem('user')
        api.fetch(
            api.endpoints.getUserById(this.getUserId()),
            (response) => {
                this.setState({
                    name: response.name,
                    mail: response.mail,
                    loading: false
                })
            });
    }

    render() {

        const {classes} = this.props;

        const {
            loading, name, mail
        } = this.state;

        return (
            <div className={classes.root}>
                {loading ?
                <Typography>...</Typography>:
                <Typography>{name}, {mail}</Typography>
            }
            </div>
        );
    }
}

UserPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    redirectToDashboardCallback: PropTypes.func,
};

export default withStyles(styles)(UserPanel);