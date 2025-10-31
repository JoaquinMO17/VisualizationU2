// Utility functions for data processing and calculations

const Utils = {
    // Format large numbers with commas
    formatNumber(num) {
        if (num === null || num === undefined || num === '' || num === '..') return 'N/A';
        const number = parseFloat(num);
        if (isNaN(number)) return 'N/A';
        return number.toLocaleString('en-US', { maximumFractionDigits: 0 });
    },

    // Format numbers with decimals
    formatDecimal(num, decimals = 2) {
        if (num === null || num === undefined || num === '' || num === '..') return 'N/A';
        const number = parseFloat(num);
        if (isNaN(number)) return 'N/A';
        return number.toLocaleString('en-US', { 
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals 
        });
    },

    // Parse numeric value from string
    parseNumber(value) {
        if (value === null || value === undefined || value === '' || value === '..') return null;
        const num = parseFloat(value);
        return isNaN(num) ? null : num;
    },

    // Calculate percentage change
    calculateGrowthRate(oldValue, newValue) {
        if (!oldValue || !newValue) return null;
        return ((newValue - oldValue) / oldValue) * 100;
    },

    // Get unique values from array
    getUniqueValues(arr) {
        return [...new Set(arr)].filter(v => v !== null && v !== undefined && v !== '');
    },

    // Calculate mean
    mean(arr) {
        const validNumbers = arr.filter(n => n !== null && !isNaN(n));
        if (validNumbers.length === 0) return 0;
        return validNumbers.reduce((a, b) => a + b, 0) / validNumbers.length;
    },

    // Calculate standard deviation
    standardDeviation(arr) {
        const avg = this.mean(arr);
        const validNumbers = arr.filter(n => n !== null && !isNaN(n));
        if (validNumbers.length === 0) return 0;
        const squareDiffs = validNumbers.map(value => Math.pow(value - avg, 2));
        return Math.sqrt(this.mean(squareDiffs));
    },

    // Calculate percentile
    percentile(arr, p) {
        const validNumbers = arr.filter(n => n !== null && !isNaN(n)).sort((a, b) => a - b);
        if (validNumbers.length === 0) return 0;
        const index = (p / 100) * (validNumbers.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        const weight = index % 1;
        if (lower === upper) return validNumbers[lower];
        return validNumbers[lower] * (1 - weight) + validNumbers[upper] * weight;
    },

    // Detect outliers using IQR method
    detectOutliers(arr) {
        const q1 = this.percentile(arr, 25);
        const q3 = this.percentile(arr, 75);
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;
        return arr.filter(n => n !== null && !isNaN(n) && (n < lowerBound || n > upperBound));
    },

    // Simple linear regression for predictions
    linearRegression(x, y) {
        const n = x.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        
        for (let i = 0; i < n; i++) {
            sumX += x[i];
            sumY += y[i];
            sumXY += x[i] * y[i];
            sumXX += x[i] * x[i];
        }
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        return { slope, intercept };
    },

    // Predict future values
    predict(regression, x) {
        return regression.slope * x + regression.intercept;
    },

    // Generate color palette
    getColorPalette(count) {
        const colors = [
            '#A8C5E6', '#B088B0', '#D4A574', '#7CB342', '#E57373',
            '#81C784', '#64B5F6', '#FFD54F', '#FF8A65', '#BA68C8',
            '#4DD0E1', '#AED581', '#FFB74D', '#F06292', '#9575CD',
            '#4FC3F7', '#DCE775', '#FFA726', '#EC407A', '#7E57C2'
        ];
        return colors.slice(0, count);
    },

    // Sort data by key
    sortByKey(arr, key, ascending = true) {
        return arr.sort((a, b) => {
            const aVal = this.parseNumber(a[key]);
            const bVal = this.parseNumber(b[key]);
            if (aVal === null) return 1;
            if (bVal === null) return -1;
            return ascending ? aVal - bVal : bVal - aVal;
        });
    },

    // Group data by key
    groupBy(arr, key) {
        return arr.reduce((groups, item) => {
            const group = item[key];
            if (!groups[group]) groups[group] = [];
            groups[group].push(item);
            return groups;
        }, {});
    }
};