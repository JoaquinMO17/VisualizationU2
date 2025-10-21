const createComparisonChart = (canvasId, btcData, ethData, dogeData, limit = 90) => {
    const btcProcessed = processPriceData(btcData, limit);
    const ethProcessed = processPriceData(ethData, limit);
    const dogeProcessed = processPriceData(dogeData, limit);
    
    const btcNormalized = normalizeData(btcProcessed.values);
    const ethNormalized = normalizeData(ethProcessed.values);
    const dogeNormalized = normalizeData(dogeProcessed.values);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getMultiLineChartConfig({
        labels: btcProcessed.labels.map(date => formatDateShort(date)),
        series: [
            {
                label: 'Bitcoin',
                values: btcNormalized,
                color: COLORS.btc
            },
            {
                label: 'Ethereum',
                values: ethNormalized,
                color: COLORS.eth
            },
            {
                label: 'Dogecoin',
                values: dogeNormalized,
                color: COLORS.doge
            }
        ]
    });
    
    return new Chart(ctx, config);
};

const createSinglePriceChart = (canvasId, data, label, color, limit = 90) => {
    const processed = processPriceData(data, limit);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getLineChartConfig(label, color, {
        labels: processed.labels.map(date => formatDateShort(date)),
        values: processed.values
    });
    
    return new Chart(ctx, config);
};