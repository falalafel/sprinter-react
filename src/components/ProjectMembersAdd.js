import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import {Button, ListItemText} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
    return <div style={{height: 50}} ref={inputRef} {...props} />;
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
                background: props.isSelected ? 'primary' : 'secondary',
            }}
            {...props.innerProps}
        >
            {props.children}

        </MenuItem>

    );
}

const getOptionLabel = (option) => {
    return option.name.trim() + ' ' + option.mail.trim();
};

const formatOptionLabel = option => (
    <div className="option" >
        <ListItemText primary={option.name} secondary={option.mail} />
    </div>
);

const customFilterOption = (option, rawInput) => {
    const words = rawInput.toUpperCase().split(' ');

    const labelWords = option.label.toUpperCase().split(' ');
    const mail = labelWords[labelWords.length - 1];
    const name = labelWords.slice(0, -1).join(' ');

    return words.reduce(
        (acc, cur) => acc && (name.includes(cur) || mail.includes(cur)),
        true,
    );
};


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
        <div>{props.children}</div>
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

class ProjectMembersAdd extends React.Component {
    state = {
        selectedUser: null,
    };

    addUserButtonAction = () => {
        const { selectedUser } = this.state;
        this.props.addMemberCallback( selectedUser.userId );
        this.setState({
            selectedUser: null,
        });
    };

    handleChange = selectedUser => {
        this.setState({
            selectedUser: selectedUser,
        });
    };

    render() {
        const { classes, users } = this.props;

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        options={users}
                        components={components}
                        value={this.state.selectedUser}
                        onChange={this.handleChange}
                        placeholder="Add new project member"
                        isClearable
                        formatOptionLabel={formatOptionLabel}
                        getOptionLabel={getOptionLabel}
                        filterOption={customFilterOption}
                    />
                </NoSsr>
                <Button
                    disabled={ !this.state.selectedUser }
                    onClick={ () => this.addUserButtonAction() }
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

ProjectMembersAdd.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    addMemberCallback: PropTypes.func,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            userId: PropTypes.number,
            userName: PropTypes.string,
            mail: PropTypes.string,
        })
    ).isRequired,
};

export default withStyles(styles, { withTheme: true })(ProjectMembersAdd);
