import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};

function SimpleTable(props) {
    const {classes, data} = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">E-mail</TableCell>
                        <TableCell align="left">Available hours</TableCell>
                        <TableCell align="left">Work needed</TableCell>
                        <TableCell align="left">Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(entry => (
                        <TableRow key={entry.userId}>
                            <TableCell align="left" component="th" scope="row">{entry.name}</TableCell>
                            <TableCell align="left">{entry.mail}</TableCell>
                            <TableCell align="left">{entry.hoursAvailable}</TableCell>
                            <TableCell align="left">{entry.workNeeded}</TableCell>
                            <TableCell align="left">{entry.comment}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array,
};

export default withStyles(styles)(SimpleTable);