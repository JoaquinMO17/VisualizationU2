const formatCurrency = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
};

const formatNumber = (value, decimals = 0) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) return '0';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
};

const formatPercent = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) return '0.00%';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(decimals)}%`;
};

const formatLargeNumber = (value) => {
    if (value === null || value === undefined || isNaN(value) || !isFinite(value)) return '0';
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return value.toFixed(2);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
    }).format(date);
};