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
import {Tooltip} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
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
    return option.startDate.toString();
};

const formatOptionLabel = option => (
    <div>
        <Tooltip disableFocusListener disableTouchListener placement="right" title={`Sprint ${option.id}`}>
            <Typography>
                {(new Date(option.startDate)).toLocaleDateString()} &#8209; {(new Date(option.endDate)).toLocaleDateString()}
            </Typography>
        </Tooltip>
        {option.isOpen === false &&
            <ListItemSecondaryAction>
                <Tooltip disableFocusListener disableTouchListener placement="left" title="Sprint summarised"
                         style={{float: "right", paddingRight: 10, color: "#666666"}}>
                    <DoneIcon fontSize='small'/>
                </Tooltip>
            </ListItemSecondaryAction>
        }
    </div>
);

const customFilterOption = (option, rawInput) => {

    const inputDate = rawInput.replace(/-|\/|:|\./g, ' '); // replaces possible date separators with single whitespace
    const words = inputDate.toUpperCase().split(' ').map(w => w.trim().replace(/^0/, '')); // trims trailing zeros
    const wholeWords = words.slice(0, words.length - 1);
    const lastWord = words.slice(-1);
    const date = new Date(option.label);
    const dateItems = date.toLocaleDateString("en-US").split('/');

    // checks if every word from user input matches with some parts of the date
    return wholeWords.reduce(
        (acc, cur) => acc && (dateItems.some(i => i === cur)),
        true
    ) && dateItems.some(i => i.startsWith(lastWord));
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
            <Tooltip disableFocusListener disableTouchListener placement="right" title={`Sprint ${props.data.id}`}>
                <Typography>
                    {(new Date(props.data.startDate)).toLocaleDateString()} &#8209; {(new Date(props.data.endDate)).toLocaleDateString()}
                </Typography>
            </Tooltip>
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

function getSortedSprints(sprints) {
    return sprints.slice().sort((a, b) => {

        if (a.isOpen === true && b.isOpen === false)
            return 1;

        if (a.isOpen === false && b.isOpen === true)
            return -1;

        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);

        if (dateA === dateB)
            return a.id - b.id;

        return dateA - dateB;
    }).reverse();
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
};

class SprintSelect extends React.Component {

    handleChange = selectedSprint => {
        if (selectedSprint === null)
            this.props.sprintChangeCallback(null)
        else
            this.props.sprintChangeCallback(selectedSprint.id);
    };

    findSprint = (selectedSprintId) => {
        const selectedSprint = this.props.sprints.find(sprint => sprint.id === selectedSprintId)
        return selectedSprint === undefined ? null : selectedSprint
    };

    render() {
        const {classes, sprints, selectedSprintId, isDisabled} = this.props;
        const sortedSprints = getSortedSprints(sprints)
        const selectedSprint = this.findSprint(selectedSprintId);

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        options={sortedSprints}
                        components={components}
                        value={selectedSprint}
                        onChange={this.handleChange}
                        placeholder={isDisabled ? "Project not selected" : "Start typing sprint starting date..."}
                        isClearable
                        formatOptionLabel={formatOptionLabel}
                        getOptionLabel={getOptionLabel}
                        filterOption={customFilterOption}
                        isDisabled={isDisabled}
                    />
                </NoSsr>
            </div>
        );
    }
}

SprintSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    sprints: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            startDate: PropTypes.date,
            endDate: PropTypes.date,
            isOpen: PropTypes.bool,
        })
    ).isRequired,
    sprintChangeCallback: PropTypes.func,
    selectedSprintId: PropTypes.number,
    isDisabled: PropTypes.bool
};

export default withStyles(styles, {withTheme: true})(SprintSelect);
