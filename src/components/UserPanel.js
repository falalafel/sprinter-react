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
import BeatLoader from 'react-spinners/BeatLoader';

const styles = (theme) => ({
    root: {},
    title: {
        float: 'center',
        textAlign: 'center',
        padding: 40
    },
    userData: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionColumn: {
        float: 'left',
        textAlign: 'right',
        marginTop: 7,
    },
    descriptionTypography: {
        height: 70,
        marginRight: 20,
    },
    dataColumn: {
        float: 'left',
    },
    dataLine: {
        clear: 'left',
    },
    dataTypography: {
        float: 'left',
        height: 70,
        marginRight: 15,
    },

    button: {
        float: 'left',
    },
    editIcon: {},

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
                    ?
                    <BeatLoader
                        loading={loading}
                        size={10}
                        color={'#0000f0'}
                    />
                    :
                    <div>
                        <div className={classes.title}>
                            <Typography variant="h3">
                                Your profile
                            </Typography>
                        </div>

                        <div className={classes.userData}>

                            <div className={classes.descriptionColumn}>
                                <Typography variant='h5' className={classes.descriptionTypography}>Full name:</Typography>
                                <Typography variant='h5' className={classes.descriptionTypography}>E-mail:</Typography>
                                <Typography variant='h5' className={classes.descriptionTypography}>Account type:</Typography>
                            </div>

                            <div className={classes.dataColumn}>
                                <div className={classes.dataLine}>
                                    <Typography className={classes.dataTypography} variant='h4'>{user.name}jhvadsbajasdsadasdasdasdasdasdsadasdasdasdasdasdsadsad</Typography>
                                    <IconButton size="small" className={classes.button} title='Edit full name'>
                                        <EditIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                    </IconButton>
                                </div>
                                <div className={classes.dataLine}>
                                    <Typography className={classes.dataTypography}
                                                variant={'h4'}>{user.mail}</Typography>
                                    <IconButton size="small" className={classes.button} title='Edit e-mail'>
                                        <EditIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                    </IconButton>
                                </div>
                                <div className={classes.dataLine}>
                                    {user.role === userRole.ADMIN
                                        ? <Typography className={classes.dataTypography} variant='h4'>administrator</Typography>
                                        : <Typography className={classes.dataTypography} variant='h4'>standard</Typography>
                                    }
                                </div>
                            </div>

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