const getBaseChartConfig = () => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: {
                    family: CHART_FONTS.family,
                    size: CHART_FONTS.size
                },
                color: COLORS.textSecondary,
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            backgroundColor: COLORS.textPrimary,
            titleColor: COLORS.background,
            bodyColor: COLORS.background,
            borderColor: COLORS.border,
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            titleFont: {
                family: CHART_FONTS.family,
                size: 13,
                weight: '600'
            },
            bodyFont: {
                family: CHART_FONTS.family,
                size: 12
            }
        }
    },
    scales: {
        x: {
            grid: {
                display: true,
                color: COLORS.border,
                drawBorder: false
            },
            ticks: {
                font: {
                    family: CHART_FONTS.family,
                    size: 11
                },
                color: COLORS.textSecondary,
                maxRotation: 0,
                autoSkip: true,
                autoSkipPadding: 10,
                maxTicksLimit: 12
            }
        },
        y: {
            grid: {
                display: true,
                color: COLORS.border,
                drawBorder: false
            },
            ticks: {
                font: {
                    family: CHART_FONTS.family,
                    size: 11
                },
                color: COLORS.textSecondary
            }
        }
    }
});

const getLineChartConfig = (label, color, data) => ({
    type: 'line',
    data: {
        labels: data.labels,
        datasets: [{
            label: label,
            data: data.values,
            borderColor: color,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: color,
            tension: 0.1
        }]
    },
    options: getBaseChartConfig()
});

const getMultiLineChartConfig = (datasets) => ({
    type: 'line',
    data: {
        labels: datasets.labels,
        datasets: datasets.series.map(series => ({
            label: series.label,
            data: series.values,
            borderColor: series.color,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: series.color,
            tension: 0.1
        }))
    },
    options: getBaseChartConfig()
});

const getBarChartConfig = (label, color, data) => ({
    type: 'bar',
    data: {
        labels: data.labels,
        datasets: [{
            label: label,
            data: data.values,
            backgroundColor: color,
            borderWidth: 0,
            borderRadius: 4
        }]
    },
    options: {
        ...getBaseChartConfig(),
        plugins: {
            ...getBaseChartConfig().plugins,
            legend: {
                display: false
            }
        }
    }
});