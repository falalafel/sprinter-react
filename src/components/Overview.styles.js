const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },

    projectSelection: {
        float: "left",
    },
    sprintSelection: {
        float: "left",
        marginLeft: 50,
    },

    typography: {
        float: 'left',
        paddingRight: 15,
    },
    // buttonsContainer: {
    //     paddingTop: 20,
    //     clear: "left",
    // },
    button: {
        // margin: theme.spacing.unit * 2,
        float: "left",
    },
    dialog: {
        float: "left",
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