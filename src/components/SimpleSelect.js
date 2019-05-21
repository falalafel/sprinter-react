import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import FilledInput from '@material-ui/core/FilledInput/index';
import InputLabel from '@material-ui/core/InputLabel/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import FormControl from '@material-ui/core/FormControl/index';
import Select from '@material-ui/core/Select/index';

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
        item: '',
        name: '',
        labelWidth: 0,
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        this.props.itemListCallback(event.target.value);
    };

    render() {
        const {classes, label, itemList, disabled} = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="select-simple">{label}</InputLabel>
                    <Select
                        value={this.state.item}
                        onChange={this.handleChange}
                        input={<FilledInput name="item" id="filled-item-simple"/>}
                        disabled={disabled}
                    >

                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {itemList.map(item =>
                            <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </form>
        )
    }

}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    itemList: PropTypes.array,
    itemListCallback: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
};

export default withStyles(styles)(SimpleSelect);