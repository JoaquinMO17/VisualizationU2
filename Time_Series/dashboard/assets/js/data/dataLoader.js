const loadCSV = async (path) => {
    try {
        console.log('START loadCSV');
        console.log('Path:', path);
        
        const response = await fetch(path);
        console.log('Fetch response status:', response.status);
        
        const csvText = await response.text();
        console.log('CSV text length:', csvText.length);
        
        const lines = csvText.split('\n');
        console.log('Total lines:', lines.length);
        console.log('First 5 lines:', lines.slice(0, 5));
        
        const dataLines = lines.slice(3).filter(line => line.trim());
        console.log('Data lines after skipping headers:', dataLines.length);
        
        const reconstructedCSV = 'Date,Open,High,Low,Close,Volume\n' + dataLines.join('\n');
        console.log('Reconstructed CSV first 200 chars:', reconstructedCSV.substring(0, 200));
        
        return new Promise((resolve, reject) => {
            Papa.parse(reconstructedCSV, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log('Parse complete');
                    console.log('Total rows parsed:', results.data.length);
                    console.log('First row:', results.data[0]);
                    console.log('Last row:', results.data[results.data.length - 1]);
                    console.log('END loadCSV');
                    resolve(results.data);
                },
                error: (error) => {
                    console.error('Parse error:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('ERROR in loadCSV');
        console.error('Path:', path);
        console.error('Error:', error);
        throw error;
    }
};

const loadAllCryptoData = async () => {
    try {
        console.log('START loadAllCryptoData');
        const [btcData, ethData, dogeData] = await Promise.all([
            loadCSV(DATA_PATHS.btc),
            loadCSV(DATA_PATHS.eth),
            loadCSV(DATA_PATHS.doge)
        ]);
        
        console.log('All data loaded');
        console.log('BTC rows:', btcData.length);
        console.log('ETH rows:', ethData.length);
        console.log('DOGE rows:', dogeData.length);
        console.log('END loadAllCryptoData');
        
        return {
            btc: btcData,
            eth: ethData,
            doge: dogeData
        };
    } catch (error) {
        console.error('ERROR in loadAllCryptoData:', error);
        throw error;
    }
};

const loadInterestData = async () => {
    try {
        console.log('START loadInterestData');
        const response = await fetch(DATA_PATHS.interest);
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log('Interest data loaded:', results.data.length, 'rows');
                    console.log('END loadInterestData');
                    resolve(results.data);
                },
                error: (error) => {
                    console.error('ERROR parsing interest data:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('ERROR in loadInterestData:', error);
        throw error;
    }
};

const loadSingleCryptoData = async (cryptoType) => {
    console.log('START loadSingleCryptoData');
    console.log('Crypto type:', cryptoType);
    
    const path = DATA_PATHS[cryptoType.toLowerCase()];
    console.log('Path from DATA_PATHS:', path);
    
    if (!path) {
        console.error('Invalid crypto type:', cryptoType);
        throw new Error('Invalid crypto type: ' + cryptoType);
    }
    
    const data = await loadCSV(path);
    console.log('Single crypto data loaded:', data.length, 'rows');
    console.log('END loadSingleCryptoData');
    return data;
};