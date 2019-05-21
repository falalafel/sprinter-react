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
    root: {
        flexGrow: 1,
        maxWidth: 500,
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
        backgroundColor: "pink"
    },
    closedOption: {
        fontSize: 14,
        backgroundColor: "gray"
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
            className={props.selectProps.classes.closedOption}
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
        // TODO reformat
        {option.name}
        {option.id < 5 ? "option" : "closedOption"}
    </div>
);

const customFilterOption = (option, rawInput) => {
    //TODO
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
        //TODO
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

function sortProjects(projects) {
    // TODO
    return projects
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
        if(selectedProject === null)
            this.props.projectChangeCallback(null)
        else
            this.props.projectChangeCallback(selectedProject.id);
    };

    findProject = (selectedProjectId) => {
        return this.props.projects.find(project => project.id === selectedProjectId)
    };

    render() {
        const { classes, projects, selectedProjectId } = this.props;
        console.log("dupa ", this.props.selectedProjectId, selectedProjectId);

        const selectedOne = this.findProject(selectedProjectId);
        console.log(selectedOne);

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        options={sortProjects(projects)}
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

export default withStyles(styles, { withTheme: true })(ProjectSelect);
