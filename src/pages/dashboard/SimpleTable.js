import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const data = [
    createData('John Marina', 159, 6.0, 24, 4.0),
    createData('Ann Monte', 237, 9.0, 37, 4.3),
    createData('Sam Eclair', 262, 16.0, 24, 6.0),
    createData('Woo Mee', 305, 3.7, 67, 4.3),
    createData('Abid Amin', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Reported hours</TableCell>
                        <TableCell align="right">Left work</TableCell>
                        <TableCell align="right">Available</TableCell>
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
                            <TableCell align="right">{n.carbs}</TableCell>
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
};

export default withStyles(styles)(SimpleTable);