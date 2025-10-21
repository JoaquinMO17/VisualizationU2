let priceChart = null;
let volumeChart = null;

const initDogePage = async () => {
    try {
        const data = await loadSingleCryptoData('doge');
        
        const currentPrice = getCurrentPrice(data);
        const priceChange = getPriceChange(data, 1);
        const stats = getStatistics(data);
        
        updateMetricCard('current-price', currentPrice, priceChange.percent, '24h change');
        
        const highCard = document.getElementById('high-price');
        if (highCard) {
            const valueElement = highCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = formatCurrency(stats.high, 4);
            }
        }
        
        const lowCard = document.getElementById('low-price');
        if (lowCard) {
            const valueElement = lowCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = formatCurrency(stats.low, 4);
            }
        }
        
        const volumeCard = document.getElementById('volume-metric');
        if (volumeCard) {
            const valueElement = volumeCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = '$' + formatLargeNumber(stats.avgVolume);
            }
        }
        
        createStatisticsTable('statistics-table', data, 'Dogecoin');
        
        priceChart = registerChart(createOHLCChart('price-chart', data, 'Dogecoin', COLORS.doge, 90));
        volumeChart = registerChart(createVolumeChart('volume-chart', data, COLORS.doge, 90));
        
    } catch (error) {
        handleError(error, 'DOGE Page');
    }
};

document.addEventListener('DOMContentLoaded', initDogePage);