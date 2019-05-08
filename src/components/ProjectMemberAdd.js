/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import {Button} from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import AddIcon from '@material-ui/icons/Add';


const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label + " (XDD@asd)",
}));

const styles = theme => ({
    addUserButton: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        fontSize: 12,
    },
    leftIcon: {
        marginRight: theme.spacing.unit / 3,
        fontSize: 16,
    },
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    option: {
        fontSize: 14,

    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 14,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 14,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 0,
        left: 0,
        right: 0,
    },

});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            className={props.selectProps.classes.option}
            style={{
                fontWeight: props.isSelected ? 650 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}

        </MenuItem>

    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
};

class ProjectMemberAdd extends React.Component {
    state = {
        selectedUserID: null,
    };

    addUserButtonAction = selectedUserID => {
        this.props.addMemberCallback( this.state.selectedUserID );
        this.setState({
            selectedUserID: null,
        });
    }

    handleChange = selected => {
        this.setState({
            selectedUserID: selected,
        });
    };

    render() {
        const { classes, theme, addMemberCallback } = this.props;

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        options={suggestions}
                        components={components}
                        value={this.state.selectedUserID}
                        onChange={(value) => this.handleChange(value)}
                        placeholder="Add new project member"
                        isClearable
                    />
                </NoSsr>
                <Button
                    disabled={ !this.state.selectedUserID}
                    onClick={ () => this.addUserButtonAction( this.state.selectedUserID ) }
                    color="primary"
                    variant="contained"
                    className={classes.addUserButton}
                >
                    <AddIcon className={classes.leftIcon} />
                    Add user
                </Button>
            </div>
        );
    }
}

ProjectMemberAdd.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    addMemberCallback: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(ProjectMemberAdd);
