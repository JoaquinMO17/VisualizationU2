const AppState = {
    currentPage: null,
    loadedData: {},
    activeCharts: []
};

const destroyAllCharts = () => {
    AppState.activeCharts.forEach(chart => {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    });
    AppState.activeCharts = [];
};

const registerChart = (chart) => {
    if (chart) {
        AppState.activeCharts.push(chart);
    }
    return chart;
};

const handleError = (error, context = '') => {
    console.error(`Error in ${context}:`, error);
};

window.addEventListener('beforeunload', () => {
    destroyAllCharts();
});