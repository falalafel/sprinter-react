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
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton/index';
import Snackbar from '@material-ui/core/Snackbar';
import BeatLoader from 'react-spinners/BeatLoader';
import TextField from '@material-ui/core/TextField';
import ChangePasswordDialog from "./ChangePasswordDialog";

const styles = (theme) => ({
    root: {},
    title: {
        textAlign: 'center',
        padding: 40
    },
    descriptionTypography: {
        float: 'right',
        height: 70,
        marginRight: 20,
    },
    dataLine: {
        height: 70,
    },
    dataTypography: {
        float: 'left',
        marginRight: 15,
        fontWeight: 'bold',
    },
    button: {
        float: 'left',
        marginTop: -6,
    },
    textField: {
        float: 'left',
        marginTop: '-10px'
    },
    passwordChangeButton: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    loader: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    }

});

class UserPanel extends React.Component {

    state = {
        user: undefined,
        loading: true,
        name: "",
        email: "",
        passwordMessageOpen: false,
        passwordChangeSuccess: false
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
                    loading: false,
                    buttonsEnabled: true,
                    name: response.name,
                    mail: response.mail
                })
            });
    }

    submitPasswordChange(oldPassword, newPassword) {
        const data = {
            oldPassword: oldPassword,
            password: newPassword
        }
        this.setState({
            loading: true
        });
        api.fetchNoContent(
            api.endpoints.updateUser(
                this.getUserId(),
                data
            ),
            (res) => {
                if(res.status === 404) {
                    this.setState({
                        passwordMessageOpen: true,
                        passwordChangeSuccess: false,
                        loading: false
                    });
                }
                else {
                    this.setState({
                        passwordMessageOpen: true,
                        passwordChangeSuccess: true,
                        loading: false
                    });
                }
            });
    }

    render() {

        const {classes} = this.props;
        const {loading, user, passwordMessageOpen, passwordChangeSuccess} = this.state;

        return (
            <div className={classes.root}>    
                <div className={classes.title}>
                    <Typography variant="h3">
                        Your profile
                    </Typography>
                </div>
                {loading
                    ?
                    <div className={classes.loader}>
                        <BeatLoader
                            loading={loading}
                            size={10}
                            color={'#0000f0'}
                        />
                    </div>
                    :
                    <div>
                        <Grid container spacing={0} justify='center'>

                            <Grid item xs={6}>
                                <Typography variant='h5' className={classes.descriptionTypography}>Full name:</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography className={classes.dataTypography} variant='h5'>{user.name}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant='h5' className={classes.descriptionTypography}>E-mail:</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography className={classes.dataTypography} variant={'h5'}>{user.mail}</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Typography variant='h5' className={classes.descriptionTypography}>Account type:</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <div className={classes.dataLine}>
                                    {user.role === userRole.ADMIN
                                        ? <Typography className={classes.dataTypography} variant='h5'>administrator</Typography>
                                        : <Typography className={classes.dataTypography} variant='h5'>standard</Typography>
                                    }
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div className={classes.passwordChangeButton}>
                                    <ChangePasswordDialog passwordChangeCallback={this.submitPasswordChange.bind(this)} />
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                }
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={passwordMessageOpen}
                    onClose={() => this.setState({passwordMessageOpen: false})}
                    autoHideDuration={3000}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={passwordChangeSuccess ? 'Password changed successfully' : 'Password change failed!'}
                />
            </div>
        );
    }
}

UserPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPanel);