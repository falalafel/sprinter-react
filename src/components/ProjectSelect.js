import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import {Button, ListItemText, Tooltip} from "@material-ui/core";
import PeopleIcon from '@material-ui/icons/People';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: 500,
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
        left: 10,
        fontSize: 14,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 0,
        left: 0,
        right: 0,
    },


    dupa: {
        background: "green"
    }

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

function inputComponent({inputRef, ...props}) {
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
    return option.name.trim();
};

const formatOptionLabel = option => (
    <div>
        {option.name}
        <ListItemSecondaryAction>
            {!option.isOpen ?
                <Tooltip disableFocusListener disableTouchListener title="Project is closed"
                         style={{float: "right", padding: 10}}>
                    <NotInterestedIcon color='disabled' fontSize='small'/>
                </Tooltip>
                : ""
            }
            {option.id > 6 && option.id !== 3 ? //TODO if im scrum master
                <Tooltip disableFocusListener disableTouchListener title="Scrum master privileges"
                         style={{float: "right", padding: 10}}>
                    <PeopleIcon color='disabled' fontSize='small'/>
                </Tooltip>
                : ""
            }
        </ListItemSecondaryAction>
    </div>
);

const customFilterOption = (option, rawInput) => {
    const inputWords = rawInput.toUpperCase().split(/ +|-|_/);
    const labelWords = option.label.toUpperCase().split(/ +|-|_/);

    return inputWords.reduce(
        (acc, cur) => acc && labelWords.some(labelWord => labelWord.startsWith(cur)),
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
        <div>
            {props.data.name}
        </div>
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

function projectComparator(project1, project2) {
    if (project1.isOpen === project2.isOpen)
        if (project1.startDate < project2.startDate)
            return 1;
        else
            return -1;
    else if (project1.isOpen && !project2.isOpen)
        return -1;
    else
        return 1;
}

function sortProjects(projectList) {
    return projectList.sort(projectComparator)
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
};

class ProjectSelect extends React.Component {

    handleChange = selectedProject => {
        if (selectedProject === null)
            this.props.projectChangeCallback(null);
        else
            this.props.projectChangeCallback(selectedProject.id);
    };

    findProject = (selectedProjectId) => {
        const selectedProject = this.props.projects.find(project => project.id === selectedProjectId);
        return selectedProject === undefined ? null : selectedProject;
    };

    render() {
        const {classes, projects, selectedProjectId} = this.props;

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        options={sortProjects(projects.slice())}
                        components={components}
                        value={this.findProject(selectedProjectId)}
                        onChange={this.handleChange}
                        placeholder="Start typing project name..."
                        isClearable
                        formatOptionLabel={formatOptionLabel}
                        getOptionLabel={getOptionLabel}
                        filterOption={customFilterOption}
                    />
                </NoSsr>
            </div>
        );
    }
}

ProjectSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            isOpen: PropTypes.bool,
            startDate: PropTypes.date,
        })
    ).isRequired,
    projectChangeCallback: PropTypes.func,
    selectedProjectId: PropTypes.number,
};

export default withStyles(styles, {withTheme: true})(ProjectSelect);
