import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/index';
import {withStyles} from '@material-ui/core/styles/index';
import FilledInput from '@material-ui/core/FilledInput/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    userBar: {
        padding: '5px 9px',
        minWidth: 120,
        background: 'black',
        color: 'white',
        float: 'left',
        textAlign: 'center'
    },
    removeButton: {
        background: '#ff0000',
        color: '#fff',
        border: 'none',
        padding: '5px 9px',
        borderRadius: '50%',
        cursor: 'pointer',
        float: 'left'
    },
};


class ProjectMembresCreateItem extends React.Component {
    state = {
        isScrumMaster: false
    };

    getToggleButtonStyle = () => {
        return {
            background: this.state.isScrumMaster ? 'green' : 'red',
            color: '#fff',
            border: 'none',
            padding: '5px 9px',
            borderRadius: '50%',
            cursor: 'pointer',
            float: 'left'
        }
    }

    handleToggleScrumMaster = (event) => {
        this.setState({ isScrumMaster: !this.state.isScrumMaster });
    };

    render() {
        const {userName, removeCallback} = this.props;
        return (
            <div style={ styles.root }>
                <div style={ styles.userBar }>
                    { this.props.userName }
                </div>
                <IconButton style={ styles.removeButton }>X</IconButton>
                <IconButton style={ this.getToggleButtonStyle() } onClick={ () => this.handleToggleScrumMaster() }>S</IconButton>
            </div>
        )
    }

}

ProjectMembresCreateItem.propTypes = {
    userName: PropTypes.string,
    removeCallback: PropTypes.func,
};

export default (ProjectMembresCreateItem);