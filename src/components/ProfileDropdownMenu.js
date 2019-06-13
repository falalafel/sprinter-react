import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Divider } from '@material-ui/core';

class ProfileDropdownMenu extends React.Component {

    state = {
        open: false,
        anchorEl: null
    };

    handleClick = (event) => {
        this.setState({
            open: !this.state.open,
            anchorEl: event.currentTarget
        });
    }

    handleClose = () => {
        this.setState({
            open: false,
            anchorEl: null
        });
    }

    clickWrapper = (callback) => {
        this.handleClose();
        callback();
    }

    render() {
        const {open, anchorEl} = this.state;
        const {logoutCallback, profileCallback} = this.props;
        return (
            <div>
                <IconButton
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="inherit"
                    onClick={this.handleClick}
                >
                    <ArrowDropDownIcon />
                </IconButton>
                
                <Menu
                    id="customized-menu"
                    keepMounted
                    open={open}
                    onClose={this.handleClose}
                    disableAutoFocusItem
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    
                    <MenuItem onClick={() => this.clickWrapper(profileCallback)}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="My profile" />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => this.clickWrapper(logoutCallback)}>
                    <ListItemIcon>
                        <CloseIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign out" />
                    </MenuItem>
                </Menu>
            </div>
        )
    }
}

export default (ProfileDropdownMenu);