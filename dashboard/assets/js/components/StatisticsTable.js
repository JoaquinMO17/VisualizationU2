const createStatisticsTable = (containerId, data, cryptoName) => {
    const stats = getStatistics(data);
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const ma50 = calculateMovingAverage(stats.close || processOHLCData(data).close, 50);
    const ma200 = calculateMovingAverage(stats.close || processOHLCData(data).close, 200);
    
    const html = `
        <table class="stats-table">
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Current Price</td>
                    <td>${formatCurrency(stats.currentPrice)}</td>
                </tr>
                <tr>
                    <td>24h High</td>
                    <td>${formatCurrency(stats.high)}</td>
                </tr>
                <tr>
                    <td>24h Low</td>
                    <td>${formatCurrency(stats.low)}</td>
                </tr>
                <tr>
                    <td>Average Volume</td>
                    <td>$${formatLargeNumber(stats.avgVolume)}</td>
                </tr>
                <tr>
                    <td>Volatility</td>
                    <td>${stats.volatility.toFixed(2)}%</td>
                </tr>
                <tr>
                    <td>MA50</td>
                    <td>${formatCurrency(ma50[ma50.length - 1] || 0)}</td>
                </tr>
                <tr>
                    <td>MA200</td>
                    <td>${formatCurrency(ma200[ma200.length - 1] || 0)}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
};