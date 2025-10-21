const createVolumeChart = (canvasId, data, color, limit = 90) => {
    const processed = processOHLCData(data, limit);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getBarChartConfig('Volume', color, {
        labels: processed.dates.map(date => formatDateShort(date)),
        values: processed.volume
    });
    
    config.options.plugins.tooltip = {
        ...config.options.plugins.tooltip,
        callbacks: {
            label: function(context) {
                return `Volume: $${formatLargeNumber(context.parsed.y)}`;
            }
        }
    };
    
    config.options.scales.y.ticks.callback = function(value) {
        return '$' + formatLargeNumber(value);
    };
    
    return new Chart(ctx, config);
};