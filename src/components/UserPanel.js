import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ProjectMembersCreate from "./ProjectMembersCreate";
import api from "../api";
import ProjectConfig from "./ProjectConfig";
import {Divider, Grid, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {resolve} from 'dns';
import List from "@material-ui/core/List";
import {userRole} from "../userRole";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton/index';


const styles = (theme) => ({
    root: {},
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40
    },
    descriptionColumn: {
        textAlign: 'right',
        color: 'gray',
    },
    descriptionTypography: {
        height: 70,
        marginRight: 20,
        verticalAlign: 'text-bottom',
        paddingTop: 7,
    },
    dataColumn: {
        float: 'left',
    },
    dataTypography: {
        float: 'left',
        marginRight: 15,
        height: 70,
        // marginLeft: -100,
        verticalAlign: 'text-bottom',
    },
    userData: {
        // float: 'center',
        borderStyle: 'dotted',
    },

    button: {
        float: 'left',
    },
    editIcon: {

    },

});

class UserPanel extends React.Component {

    state = {
        user: undefined,
        loading: true,
    };

    componentDidMount() {
        this.fetchAndSetUser()
    }

    getUserId() {
        return JSON.parse(localStorage.getItem('user')).userId
    }

    fetchAndSetUser() {
        api.fetch(
            api.endpoints.getUserById(this.getUserId()),
            (response) => {
                this.setState({
                    user: response,
                    loading: false
                })
            });
    }

    render() {

        const {classes} = this.props;
        const {loading, user} = this.state;

        console.log(user);

        return (
            <div className={classes.root}>
                {loading
                    ? <Typography>...</Typography>
                    : <div>
                        <div className={classes.title}>
                            <Typography variant="h3">
                                Your profile
                            </Typography>
                        </div>

                        <div className={classes.userData}>
                            <Grid container spacing={0} justify='center'>
                                <Grid item xs={6}>
                                    <div className={classes.descriptionColumn}>
                                        <Typography variant='h5' className={classes.descriptionTypography}>Full name:</Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.dataColumn}>
                                        <Typography className={classes.dataTypography} variant='h4'>{user.name}</Typography>
                                        <IconButton size="small" className={classes.button} title='Edit full name'>
                                            <EditIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.descriptionColumn}>
                                        <Typography variant='h5' className={classes.descriptionTypography}>E-mail:</Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.dataColumn}>
                                        <Typography className={classes.dataTypography} variant={'h4'}>{user.mail}</Typography>
                                        <IconButton size="small" className={classes.button} title='Edit e-mail'>
                                            <EditIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.descriptionColumn}>
                                        <Typography variant='h5' className={classes.descriptionTypography}>Account type:</Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className={classes.dataColumn}>
                                        { user.role === userRole.ADMIN
                                            ? <Typography className={classes.dataTypography} variant='h4'>administrator</Typography>
                                            : <Typography className={classes.dataTypography} variant='h4'>standard</Typography>
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
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