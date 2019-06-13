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
        editName: false,
        editMail: false,
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

    toggleEditName() {
        this.setState({
            editName: !this.state.editName
        })
    }

    submitNewName() {
        const data = {name: this.state.name}
        this.setState({
            editName: false,
            editMail: false,
            loading: true
        });
        api.fetchNoContent(
            api.endpoints.updateUser(
                this.getUserId(),
                data
            ),
            () => {
                this.fetchAndSetUser();
            });
    }

    toggleEditMail() {
        this.setState({
            editMail: !this.state.editMail
        })
    }

    submitNewMail() {
        const data = {mail: this.state.mail}
        this.setState({
            editName: false,
            editMail: false,
            loading: true
        });
        api.fetchNoContent(
            api.endpoints.updateUser(
                this.getUserId(),
                data
            ),
            () => {
                this.fetchAndSetUser();
            });
    }

    submitPasswordChange(old, newPassword) {
        const data = {
            oldPassword: old,
            password: newPassword
        }
        this.setState({
            editName: false,
            editMail: false,
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
                    });
                    this.fetchAndSetUser();
                }
            });
    }

    render() {

        const {classes} = this.props;
        const {loading, user, editName, editMail} = this.state;

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
                                {editName
                                    ? <div className={classes.dataLine}>
                                        <TextField
                                            id="edit-name"
                                            className={classes.textField}
                                            defaultValue={this.state.name}
                                            onChange={(event) => this.setState({name: event.target.value})}
                                            margin="normal"
                                            variant="outlined"
                                            inputProps={{'aria-label': 'edit-name'}}
                                        />
                                        <IconButton
                                            size="small"
                                            className={classes.button}
                                            title='Submit'
                                            onClick={this.submitNewName.bind(this)}
                                            disabled={this.state.name === ""}
                                        >
                                            <DoneIcon
                                                fontSize="small"
                                                className={classes.editIcon}
                                                color={'disabled'}/
                                            >
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            className={classes.button}
                                            title='Cancel'
                                            onClick={this.toggleEditName.bind(this)}
                                        >
                                            <CloseIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                        </IconButton>
                                    </div>
                                    : <div className={classes.dataLine}>
                                        <Typography className={classes.dataTypography} variant='h5'>{user.name}</Typography>
                                        <IconButton
                                            size="small"
                                            className={classes.button}
                                            title='Cancel'
                                            onClick={this.toggleEditName.bind(this)}
                                        >
                                            <EditIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                        </IconButton>
                                    </div>
                                }
                            </Grid>


                            <Grid item xs={6}>
                                <Typography variant='h5' className={classes.descriptionTypography}>E-mail:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {editMail
                                    ? <div className={classes.dataLine}>
                                        <TextField
                                            id="edit-mail"
                                            className={classes.textField}
                                            defaultValue={this.state.mail}
                                            onChange={(event) => this.setState({mail: event.target.value})}
                                            margin="normal"
                                            variant="outlined"
                                            inputProps={{'aria-label': 'edit-mail'}}
                                        />
                                        <IconButton
                                            size="small"
                                            className={classes.button}
                                            title='Submit'
                                            onClick={this.submitNewMail.bind(this)}
                                            disabled={this.state.mail === ""}
                                        >
                                            <DoneIcon
                                                fontSize="small"
                                                className={classes.editIcon}
                                                color={'disabled'}/
                                            >
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            className={classes.button}
                                            title='Cancel'
                                            onClick={this.toggleEditMail.bind(this)}
                                        >
                                            <CloseIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                        </IconButton>
                                    </div>
                                    : <div className={classes.dataLine}>
                                        <Typography className={classes.dataTypography} variant={'h5'}>{user.mail}</Typography>
                                        <IconButton size="small" className={classes.button} title='Edit e-mail' onClick={this.toggleEditMail.bind(this)}>
                                            <EditIcon fontSize="small" className={classes.editIcon} color={'disabled'}/>
                                        </IconButton>
                                    </div>
                                }
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
                    open={this.state.passwordMessageOpen}
                    onClose={() => this.setState({passwordMessageOpen: false})}
                    autoHideDuration={3000}
                    ContentProps={{
                    'aria-describedby': 'message-id',
                    }}
                    message={this.state.passwordChangeSuccess ? 'Password changed successfully' : 'Password change failed!'}
                />
            </div>
        );
    }
}

UserPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    redirectToDashboardCallback: PropTypes.func,
};

export default withStyles(styles)(UserPanel);