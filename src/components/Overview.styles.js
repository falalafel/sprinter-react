const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    selectSectionContainer: {
        float: "left",
    },
    projectSelection: {
        float: "left",
        marginRight: 50,
    },
    sprintSelection: {
        float: "left",
        marginRight: 50,
    },
    statistics: {
        float: "left",
    },
    typography: {
        float: 'left',
        paddingRight: 15,
    },
    buttonsContainer: {
        paddingTop: 20,
        clear: "left",
    },
    button: {
        float: "left",
        paddingRight: 10,
        marginRight: 15
    },
    buttonIcon: {
        float: "left",
        paddingRight: 10
    },
    dialog: {
        float: "left",
        paddingRight: 10
    },

    tableContainer: {
        paddingTop: 60,
        clear: "left",
    },
    table: {
        maxHeight: 320,
        overflow: 'auto',
        clear: "left",
    },

    chartContainer: {
        marginTop: 40,
    },
    chart: {
        marginLeft: -22,
    },
});

export default styles