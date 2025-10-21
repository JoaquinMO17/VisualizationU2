const updateMetricCard = (elementId, value, change, period = 'vs last week') => {
    const card = document.getElementById(elementId);
    if (!card) return;
    
    const valueElement = card.querySelector('.metric-value');
    const changeElement = card.querySelector('.metric-change');
    const periodElement = card.querySelector('.metric-period');
    
    if (valueElement) {
        valueElement.textContent = formatCurrency(value);
    }
    
    if (changeElement && periodElement) {
        const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
        changeElement.className = `metric-change ${changeClass}`;
        
        const changeSpan = changeElement.querySelector('span:first-child');
        if (changeSpan) {
            changeSpan.textContent = formatPercent(change);
        }
        
        if (periodElement) {
            periodElement.textContent = period;
        }
    }
};

const updateAllMetrics = (btcData, ethData, dogeData) => {
    const btcPrice = getCurrentPrice(btcData);
    const btcChange = getPriceChange(btcData, 7);
    updateMetricCard('btc-metric', btcPrice, btcChange.percent);
    
    const ethPrice = getCurrentPrice(ethData);
    const ethChange = getPriceChange(ethData, 7);
    updateMetricCard('eth-metric', ethPrice, ethChange.percent);
    
    const dogePrice = getCurrentPrice(dogeData);
    const dogeChange = getPriceChange(dogeData, 7);
    updateMetricCard('doge-metric', dogePrice, dogeChange.percent);
    
    const totalVolume = getTotalVolume(btcData, 7) + getTotalVolume(ethData, 7) + getTotalVolume(dogeData, 7);
    const prevVolume = getTotalVolume(btcData.slice(0, -7), 7) + getTotalVolume(ethData.slice(0, -7), 7) + getTotalVolume(dogeData.slice(0, -7), 7);
    const volumeChange = calculatePercentChange(totalVolume, prevVolume);
    
    const volumeCard = document.getElementById('volume-metric');
    if (volumeCard) {
        const valueElement = volumeCard.querySelector('.metric-value');
        if (valueElement) {
            valueElement.textContent = '$' + formatLargeNumber(totalVolume);
        }
        updateMetricCard('volume-metric', totalVolume, volumeChange);
    }
};