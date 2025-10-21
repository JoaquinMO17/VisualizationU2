const createOHLCChart = (canvasId, data, cryptoName, color, limit = 90) => {
    const processed = processOHLCData(data, limit);
    
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const config = {
        type: 'line',
        data: {
            labels: processed.dates.map(date => formatDateShort(date)),
            datasets: [
                {
                    label: 'High',
                    data: processed.high,
                    borderColor: color,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    pointRadius: 0,
                    borderDash: [5, 5]
                },
                {
                    label: 'Close',
                    data: processed.close,
                    borderColor: color,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Low',
                    data: processed.low,
                    borderColor: color,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    pointRadius: 0,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            ...getBaseChartConfig(),
            plugins: {
                ...getBaseChartConfig().plugins,
                tooltip: {
                    ...getBaseChartConfig().plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            return `${label}: ${formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                ...getBaseChartConfig().scales,
                y: {
                    ...getBaseChartConfig().scales.y,
                    ticks: {
                        ...getBaseChartConfig().scales.y.ticks,
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    };
    
    return new Chart(ctx, config);
};