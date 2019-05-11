import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = () => ({
    root: {
        textAlign: 'center',
    },
    appHeader: {
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    },
    appLink: {
        color: '#61dafb',
    }
});

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <header className={classes.appHeader}>
                    <h1>
                        Sprinter Web App
                    </h1>
                    <Link className={classes.appLink} to='/dashboard'>Dashboard</Link>
                </header>
            </div>
        )
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
