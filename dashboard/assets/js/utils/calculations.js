const calculatePercentChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

const calculateMovingAverage = (data, window) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < window - 1) {
            result.push(null);
            continue;
        }
        const slice = data.slice(i - window + 1, i + 1);
        const sum = slice.reduce((acc, val) => acc + val, 0);
        result.push(sum / window);
    }
    return result;
};

const calculateVolatility = (prices) => {
    if (prices.length < 2) return 0;
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    const mean = returns.reduce((acc, val) => acc + val, 0) / returns.length;
    const variance = returns.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / returns.length;
    return Math.sqrt(variance) * 100;
};

const calculateROI = (initialPrice, currentPrice) => {
    if (!initialPrice || initialPrice === 0) return 0;
    return ((currentPrice - initialPrice) / initialPrice) * 100;
};

const normalizeData = (data) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    if (range === 0) return data.map(() => 0);
    return data.map(val => ((val - min) / range) * 100);
};

const getMaxValue = (data) => {
    return Math.max(...data.filter(val => val !== null && !isNaN(val)));
};

const getMinValue = (data) => {
    return Math.min(...data.filter(val => val !== null && !isNaN(val)));
};

const getAverageValue = (data) => {
    const validData = data.filter(val => val !== null && !isNaN(val));
    if (validData.length === 0) return 0;
    return validData.reduce((acc, val) => acc + val, 0) / validData.length;
};

const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter(item => {
        const itemDate = new Date(item.Date);
        return itemDate >= startDate && itemDate <= endDate;
    });
};