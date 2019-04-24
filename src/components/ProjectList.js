import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Input from '@material-ui/core/Input/index';
import OutlinedInput from '@material-ui/core/OutlinedInput/index';
import FilledInput from '@material-ui/core/FilledInput/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormHelperText from '@material-ui/core/FormHelperText/index';
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
        age: 'xx',
        name: 'hai',
        labelWidth: 0,
        projects: [],
        selectedProject: null,
    };

    componentDidMount() {
        fetch(api.endpoints.getProjects().path).then(res => res.json())
            .then(response => {
                this.setState({ projects: response });
        });
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.setState({ selectedProject: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="project-simple">Project</InputLabel>
                    <Select
                        value={this.state.age}
                        onChange={this.handleChange}
                        input={<FilledInput name="age" id="filled-age-simple" />}
                    >

                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {this.state.projects.map(project =>
                                <MenuItem key={project.projectId} value={project.projectId}>{project.name}</MenuItem>
                            )}
                    </Select>
                </FormControl>
            </form>
        )
    }

}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(SimpleSelect);