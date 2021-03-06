import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import api from "../api";
import {userRole} from "../userRole";
import {Redirect} from "react-router-dom";
import BeatLoader from 'react-spinners/BeatLoader';
import Cookies from "js-cookie";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatarContainer: {
        height: 50
    },
    loader: {
        marginTop: 20
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const check_cookie = () => Cookies.get('sprinter-client');

class SignIn extends React.Component {

    state = {
        mail: "",
        password: "",
        loading: false,
        error: false,
    };

    fetchUserAndRedirect(id) {
        api.fetchHandleError(
            api.endpoints.getUserById(id),
            (response) => {
                const user = {
                    userId: id,
                    role: response.role
                };
                console.log(user)
                localStorage.setItem('user', JSON.stringify(user));
                this.redirectAfterLogin();
            },
            this.handleLoginError.bind(this));
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    redirectAfterLogin = () => {
        if(this.props.location.state)
            this.props.history.push(this.props.location.state.from.pathname)
        else
            this.props.history.push("/overview")
    };

    handleLoginError = error => {
        this.setState({
            loading: false,
            error: true
        });
    }

    fetchLogin = (mail, password) => event => {
        if (this.state.loading) {
            return;
        }
        event.preventDefault();

        this.setState({
            loading: true,
            error: false
        })

        api.fetchHandleError(
            api.endpoints.signIn(mail, password),
            (response) => {
                this.fetchUserAndRedirect(response)
            },
            this.handleLoginError.bind(this)
        )
    };

    render() {
        const {classes} = this.props;
        const {loading, error} = this.state;

        if(check_cookie() && localStorage.getItem('user'))
            return (<Redirect to={{pathname: "/overview"}}/>);

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <div className={classes.avatarContainer}>
                        {loading ? 
                            <div className={classes.loader}>
                            <BeatLoader
                                loading={loading}
                                size={10}
                                color={'#0000f0'}
                            /></div> :
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        }
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {error &&
                        <Typography color="secondary">Incorrect mail or password</Typography>
                    }
                    <form className={classes.form} onSubmit={this.fetchLogin(this.state.mail, this.state.password)}>
                        <FormControl margin="normal"
                                     required fullWidth
                                     value={this.state.mail}
                                     onChange={this.handleChange}>
                            <InputLabel htmlFor="mail">E-mail</InputLabel>
                            <Input id="mail" name="mail" autoComplete="mail" autoFocus/>
                        </FormControl>
                        <FormControl margin="normal"
                                     required fullWidth
                                     value={this.state.password}
                                     onChange={this.handleChange}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password"/>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            type="submit"
                        >
                            Sign in
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }

}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
