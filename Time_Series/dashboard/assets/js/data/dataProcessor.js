const processOHLCData = (data, limit = 90) => {
    console.log('START processOHLCData');
    console.log('Input data length:', data.length);
    console.log('Limit:', limit);
    console.log('First input row:', data[0]);
    
    const sortedData = data
        .filter(row => {
            const hasDate = row.Date;
            const hasClose = row.Close;
            const closeIsNumber = !isNaN(parseFloat(row.Close));
            
            if (!hasDate || !hasClose || !closeIsNumber) {
                console.log('Filtered out row:', row, 'hasDate:', hasDate, 'hasClose:', hasClose, 'closeIsNumber:', closeIsNumber);
            }
            
            return hasDate && hasClose && closeIsNumber;
        })
        .sort((a, b) => new Date(a.Date) - new Date(b.Date));
    
    console.log('After filter/sort:', sortedData.length, 'rows');
    
    const processedData = sortedData.slice(-limit);
    console.log('After limit:', processedData.length, 'rows');
    console.log('First processed row:', processedData[0]);
    console.log('Last processed row:', processedData[processedData.length - 1]);
    
    const result = {
        dates: processedData.map(row => row.Date),
        open: processedData.map(row => {
            const val = parseFloat(row.Open);
            return isNaN(val) || !isFinite(val) ? 0 : val;
        }),
        high: processedData.map(row => {
            const val = parseFloat(row.High);
            return isNaN(val) || !isFinite(val) ? 0 : val;
        }),
        low: processedData.map(row => {
            const val = parseFloat(row.Low);
            return isNaN(val) || !isFinite(val) ? 0 : val;
        }),
        close: processedData.map(row => {
            const val = parseFloat(row.Close);
            return isNaN(val) || !isFinite(val) ? 0 : val;
        }),
        volume: processedData.map(row => {
            const val = parseFloat(row.Volume);
            return isNaN(val) || !isFinite(val) ? 0 : val;
        })
    };
    
    console.log('Result close values sample:', result.close.slice(0, 5));
    console.log('END processOHLCData');
    return result;
};

const processPriceData = (data, limit = 90) => {
    console.log('START processPriceData');
    const ohlc = processOHLCData(data, limit);
    const result = {
        labels: ohlc.dates,
        values: ohlc.close
    };
    console.log('END processPriceData');
    return result;
};

const getCurrentPrice = (data) => {
    console.log('START getCurrentPrice');
    console.log('Input data length:', data.length);
    
    if (!data || data.length === 0) {
        console.log('No data, returning 0');
        return 0;
    }
    
    const sortedData = data
        .filter(row => {
            const hasClose = row.Close;
            const closeIsNumber = !isNaN(parseFloat(row.Close));
            return hasClose && closeIsNumber;
        })
        .sort((a, b) => new Date(b.Date) - new Date(a.Date));
    
    console.log('Sorted data length:', sortedData.length);
    
    if (sortedData.length === 0) {
        console.log('No valid data after filter, returning 0');
        return 0;
    }
    
    console.log('Most recent row:', sortedData[0]);
    const price = parseFloat(sortedData[0]?.Close);
    console.log('Parsed price:', price);
    console.log('Is finite:', isFinite(price));
    
    const result = isNaN(price) || !isFinite(price) ? 0 : price;
    console.log('END getCurrentPrice, result:', result);
    return result;
};

const getPriceChange = (data, days = 7) => {
    console.log('START getPriceChange');
    console.log('Days:', days);
    
    if (!data || data.length < days) {
        console.log('Not enough data, returning zeros');
        return { value: 0, percent: 0 };
    }
    
    const sortedData = data
        .filter(row => row.Close && !isNaN(parseFloat(row.Close)))
        .sort((a, b) => new Date(b.Date) - new Date(a.Date));
    
    console.log('Sorted data length:', sortedData.length);
    
    if (sortedData.length <= days) {
        console.log('Not enough sorted data, returning zeros');
        return { value: 0, percent: 0 };
    }
    
    const current = parseFloat(sortedData[0]?.Close) || 0;
    const previous = parseFloat(sortedData[days]?.Close) || 0;
    
    console.log('Current price:', current);
    console.log('Previous price:', previous);
    
    if (!isFinite(current) || !isFinite(previous) || previous === 0) {
        console.log('Invalid prices, returning zeros');
        return { value: 0, percent: 0 };
    }
    
    const change = current - previous;
    const percentChange = calculatePercentChange(current, previous);
    
    console.log('Change:', change);
    console.log('Percent change:', percentChange);
    
    const result = {
        value: change,
        percent: isFinite(percentChange) ? percentChange : 0
    };
    console.log('END getPriceChange, result:', result);
    return result;
};

const getTotalVolume = (data, days = 7) => {
    console.log('START getTotalVolume');
    console.log('Days:', days);
    
    if (!data || data.length === 0) {
        console.log('No data, returning 0');
        return 0;
    }
    
    const sortedData = data
        .filter(row => row.Volume && !isNaN(parseFloat(row.Volume)))
        .sort((a, b) => new Date(b.Date) - new Date(a.Date));
    
    console.log('Sorted data length:', sortedData.length);
    
    const recentData = sortedData.slice(0, days);
    console.log('Recent data length:', recentData.length);
    
    const total = recentData.reduce((sum, row) => {
        const vol = parseFloat(row.Volume);
        return sum + (isNaN(vol) || !isFinite(vol) ? 0 : vol);
    }, 0);
    
    console.log('Total volume:', total);
    const result = isFinite(total) ? total : 0;
    console.log('END getTotalVolume, result:', result);
    return result;
};

const getStatistics = (data) => {
    console.log('START getStatistics');
    const processed = processOHLCData(data, null);
    
    const validClose = processed.close.filter(v => v > 0 && isFinite(v));
    const validHigh = processed.high.filter(v => v > 0 && isFinite(v));
    const validLow = processed.low.filter(v => v > 0 && isFinite(v));
    const validVolume = processed.volume.filter(v => v > 0 && isFinite(v));
    
    console.log('Valid close count:', validClose.length);
    console.log('Valid high count:', validHigh.length);
    console.log('Valid low count:', validLow.length);
    console.log('Valid volume count:', validVolume.length);
    
    const result = {
        currentPrice: validClose.length > 0 ? validClose[validClose.length - 1] : 0,
        high: validHigh.length > 0 ? getMaxValue(validHigh) : 0,
        low: validLow.length > 0 ? getMinValue(validLow) : 0,
        avgVolume: validVolume.length > 0 ? getAverageValue(validVolume) : 0,
        volatility: validClose.length > 1 ? calculateVolatility(validClose) : 0,
        close: validClose
    };
    
    console.log('Statistics result:', result);
    console.log('END getStatistics');
    return result;
};

const processInterestData = (data, limit = 50) => {
    console.log('START processInterestData');
    console.log('Input data length:', data.length);
    console.log('Limit:', limit);
    
    const sortedData = data
        .filter(row => row.Week)
        .sort((a, b) => new Date(a.Week) - new Date(b.Week));
    
    console.log('After filter/sort:', sortedData.length);
    
    const processedData = sortedData.slice(-limit);
    console.log('After limit:', processedData.length);
    
    const result = {
        weeks: processedData.map(row => row.Week),
        interest: processedData.map(row => {
            const val = parseInt(row.Interest);
            return isNaN(val) ? 0 : val;
        }),
        countries: processedData.map(row => row.Country || ''),
        crypto: processedData.map(row => row.Crypto || '')
    };
    
    console.log('END processInterestData');
    return result;
};

const groupInterestByCountry = (data) => {
    console.log('START groupInterestByCountry');
    console.log('Input data length:', data.length);
    
    const grouped = {};
    data.forEach(row => {
        const country = row.Country;
        if (!country) return;
        if (!grouped[country]) {
            grouped[country] = 0;
        }
        const interest = parseInt(row.Interest) || 0;
        grouped[country] += interest;
    });
    
    console.log('Grouped countries:', Object.keys(grouped).length);
    console.log('END groupInterestByCountry');
    return grouped;
};