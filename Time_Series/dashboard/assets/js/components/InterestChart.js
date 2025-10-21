const createInterestChart = (canvasId, data, limit = 50) => {
    const processed = processInterestData(data, limit);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getLineChartConfig('Interest Level', COLORS.btc, {
        labels: processed.weeks.map(week => formatDateShort(week)),
        values: processed.interest
    });
    
    config.options.plugins.tooltip.callbacks = {
        label: function(context) {
            return `Interest: ${context.parsed.y}`;
        }
    };
    
    return new Chart(ctx, config);
};

const createInterestByCountryChart = (canvasId, data) => {
    const grouped = groupInterestByCountry(data);
    const sorted = Object.entries(grouped)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = getBarChartConfig('Interest by Country', COLORS.btc, {
        labels: sorted.map(item => item[0]),
        values: sorted.map(item => item[1])
    });
    
    config.options.indexAxis = 'y';
    config.options.plugins.legend.display = false;
    
    return new Chart(ctx, config);
};