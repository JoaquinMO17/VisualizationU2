let priceChart = null;
let volumeChart = null;

const initBtcPage = async () => {
    try {
        const data = await loadSingleCryptoData('btc');
        
        const currentPrice = getCurrentPrice(data);
        const priceChange = getPriceChange(data, 1);
        const stats = getStatistics(data);
        
        updateMetricCard('current-price', currentPrice, priceChange.percent, '24h change');
        
        const highCard = document.getElementById('high-price');
        if (highCard) {
            const valueElement = highCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = formatCurrency(stats.high);
            }
        }
        
        const lowCard = document.getElementById('low-price');
        if (lowCard) {
            const valueElement = lowCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = formatCurrency(stats.low);
            }
        }
        
        const volumeCard = document.getElementById('volume-metric');
        if (volumeCard) {
            const valueElement = volumeCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = '$' + formatLargeNumber(stats.avgVolume);
            }
        }
        
        createStatisticsTable('statistics-table', data, 'Bitcoin');
        
        priceChart = registerChart(createOHLCChart('price-chart', data, 'Bitcoin', COLORS.btc, 90));
        volumeChart = registerChart(createVolumeChart('volume-chart', data, COLORS.btc, 90));
        
    } catch (error) {
        handleError(error, 'BTC Page');
    }
};

document.addEventListener('DOMContentLoaded', initBtcPage);