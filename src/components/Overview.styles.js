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
        // padding:10,
    },
    buttonsContainer: {
        float: "right",
    },
    button: {
        float: "right",
        marginLeft: 15,
    },
    buttonIcon: {
        float: "left",
        paddingRight: 2
    },
    arrowButton: {
        float: "right",
        marginLeft: 3,
    },
    test: {
      padding: -10,
    },

    dialogCreateSprint: {
        float: "right",
    },
    dialogCloseSprint: {
        float: "right",
        marginRight: 12,
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
        marginBottom: 20,

    },

    tableContainer: {
        clear: "left",
        paddingTop: 30,
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