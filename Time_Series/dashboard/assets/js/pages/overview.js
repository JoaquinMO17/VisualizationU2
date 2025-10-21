let comparisonChart = null;
let btcChart = null;
let ethChart = null;
let dogeChart = null;

const initOverviewPage = async () => {
    try {
        const data = await loadAllCryptoData();
        
        updateAllMetrics(data.btc, data.eth, data.doge);
        
        comparisonChart = registerChart(createComparisonChart('comparison-chart', data.btc, data.eth, data.doge));
        
        btcChart = registerChart(createSinglePriceChart('btc-chart', data.btc, 'Bitcoin', COLORS.btc));
        ethChart = registerChart(createSinglePriceChart('eth-chart', data.eth, 'Ethereum', COLORS.eth));
        dogeChart = registerChart(createSinglePriceChart('doge-chart', data.doge, 'Dogecoin', COLORS.doge));
        
    } catch (error) {
        handleError(error, 'Overview Page');
    }
};

document.addEventListener('DOMContentLoaded', initOverviewPage);