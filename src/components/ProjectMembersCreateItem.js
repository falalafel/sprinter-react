import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/index';
import {withStyles} from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ClearIcon from '@material-ui/icons/Clear';


const styles = {
    root: {
        display: 'flexGrow',
        flexWrap: 'wrap',
    }
};


class ProjectMembresCreateItem extends React.Component {

    render() {
        const { classes, userName, mail, isScrumMaster, toggleScrumMasterCallback, removeMemberCallback } = this.props;
    
        return (
            <div className={classes.root} >
                <ListItem>
                    <ListItemText
                        primary={ userName }
                        secondary={ mail }
                    />
                    <ListItemSecondaryAction>
                        
                        <IconButton 
                            aria-label='Toggle scrum master'
                            onClick={ () => toggleScrumMasterCallback() }
                            title= { (isScrumMaster ? 'disable' : 'enable') + ' scrum master permissions' }
                        >
                            <PeopleIcon color={ isScrumMaster ? 'inherit' : 'disabled' } />
                        </IconButton>

                        <IconButton
                            aria-label='Remove'
                            onClick={ () => removeMemberCallback() }
                            title='remove member'
                        >
                            <ClearIcon fontSize='small' />
                        </IconButton>

                    </ListItemSecondaryAction>   
                </ListItem>
            </div>
        );
    }
}

ProjectMembresCreateItem.propTypes = {
    userName: PropTypes.string,
    mail: PropTypes.string,
    isScrumMaster: PropTypes.bool,
    toggleScrumMasterCallback: PropTypes.func,
    removeMemberCallback: PropTypes.func,
};

export default withStyles(styles)(ProjectMembresCreateItem);