const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },


    sectionTitle: {
        float: "left",
        paddingRight: 25,
    },

    selectSection: {
        float: 'left',
        width: 500,
        paddingRight: 50,
    },
    singleSelectionContainer: {
        clear: "left",
        paddingBottom: 30,
    },
    selectionHeader: {
        // padding:50,
    },
    buttonsContainer: {
        float: "right",
    },
    button: {
        float: "left",
        marginLeft: 15,
    },
    buttonIcon: {
        float: "left",
        paddingRight: 10
    },
    projectSelection: {
        clear: "left",
        marginRight: 50,
        width: "100%",
    },
    sprintSelection: {
        clear: "left",
        marginRight: 50,
        width: "100%",
    },

    statisticsPaper: {
        float: "left",
        height: 300,
    },
    statistics: {
        float: "right",
        height: "100%",
    },

    tableContainer: {
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