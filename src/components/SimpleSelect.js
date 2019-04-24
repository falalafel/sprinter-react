import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import FilledInput from '@material-ui/core/FilledInput/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';
import Select from '@material-ui/core/Select/index';
import api from "../api";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    state = {
        age: '',
        name: 'hai',
        labelWidth: 0,
        projects: [],
    };

    fetchAndSetProjects() {
        api.fetch(
            this.props.endpoint.path,
            (response) => {
                this.setState({projects: response})
            });
    }

    componentDidMount() {
        this.fetchAndSetProjects()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeObj !== prevProps.activeObj) {
            this.fetchAndSetProjects()
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.props.activeObjCallback(event.target.value);
    };

    render() {
        const projects = this.state.projects;
        const {classes, handleId, label, handleLabel} = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="project-simple">{label}</InputLabel>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        input={<FilledInput name="age" id="filled-age-simple"/>}
                    >

                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {projects.map(item =>
                            <MenuItem key={handleId(item)} value={handleId(item)}>{handleLabel(item)}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </form>
        )
    }

}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    handleId: PropTypes.func,
    handleLabel: PropTypes.func,
    activeObjCallback: PropTypes.func,
    label: PropTypes.string,
    endpoint: PropTypes.object,
    activeObj: PropTypes.number,
};

export default withStyles(styles)(SimpleSelect);