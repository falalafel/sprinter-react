import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
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
    const { classes, data } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>UserId</TableCell>
                        <TableCell align="right">Reported available hours</TableCell>
                        <TableCell align="right">Left work</TableCell>
                        <TableCell align="right">Comment</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => (
                        <TableRow key={n.id}>
                            <TableCell component="th" scope="row">
                                {n.name}
                            </TableCell>
                            <TableCell align="right">{n.calories}</TableCell>
                            <TableCell align="right">{n.fat}</TableCell>
                            <TableCell align="right">{n.protein}</TableCell>
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