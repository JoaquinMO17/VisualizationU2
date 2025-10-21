const createPriceChart = (canvasId, data, cryptoName, color, limit = 90) => {
    const processed = processPriceData(data, limit);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getLineChartConfig(cryptoName, color, {
        labels: processed.labels.map(date => formatDateShort(date)),
        values: processed.values
    });
    
    config.options.plugins.tooltip.callbacks = {
        label: function(context) {
            return `${cryptoName}: ${formatCurrency(context.parsed.y)}`;
        }
    };
    
    return new Chart(ctx, config);
};

const createMultiPeriodPriceChart = (canvasId, data, cryptoName, color) => {
    const processed = processPriceData(data);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getLineChartConfig(cryptoName, color, {
        labels: processed.labels.map(date => formatDateShort(date)),
        values: processed.values
    });
    
    config.options.plugins.tooltip.callbacks = {
        label: function(context) {
            return `${cryptoName}: ${formatCurrency(context.parsed.y)}`;
        }
    };
    
    return new Chart(ctx, config);
};