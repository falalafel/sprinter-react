const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },

    selectionContainer: {
    },
    projectSelection: {
        float: "left",
    },
    sprintSelection: {
        float: "left",
        marginLeft: 50,
    },

    buttonsContainer: {
        paddingTop: 20,
        clear: 'left',
    },
    button: {
        margin: theme.spacing.unit * 2,
    },

    tableContainer: {
        marginTop: 60,
    },
    table: {
        maxHeight: 320,
        overflow: 'auto'
    },

    chartContainer: {
        marginTop: 40,
    },
    chart: {
        marginLeft: -22,
    },
});

export default styles