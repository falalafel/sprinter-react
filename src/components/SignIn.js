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

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
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
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {

    state = {
        login: "",
        password: ""
    };

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

    fetchLogin = (login, password) => event => {
        event.preventDefault();

        api.fetch(
            api.endpoints.signIn(login, password),
            (response) => {

                const user = {
                    userId: response,
                    role: userRole.ADMIN, // TODO set proper role
                };
                localStorage.setItem('user', JSON.stringify(user));

                this.redirectAfterLogin();

            }
        )
    };

    render() {
        const {classes} = this.props;

        if(localStorage.getItem('user'))
            return (<Redirect to={{pathname: "/overview"}}/>);

        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.fetchLogin(this.state.login, this.state.password)}>
                        <FormControl margin="normal"
                                     required fullWidth
                                     value={this.state.login}
                                     onChange={this.handleChange}>
                            <InputLabel htmlFor="login">Login</InputLabel>
                            <Input id="login" name="login" autoComplete="login" autoFocus/>
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
