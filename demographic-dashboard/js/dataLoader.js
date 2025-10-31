// Data loading and management

let globalData = [];
let processedData = {};

const DataLoader = {
    // Load CSV file
    loadCSV(file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.data.length === 0) {
                        reject(new Error('CSV vacio'));
                        return;
                    }
                    globalData = results.data;
                    this.processData();
                    resolve(globalData);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    },

    // Load CSV from path (for initial load)
    loadCSVFromPath(path) {
        return new Promise((resolve, reject) => {
            Papa.parse(path, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (!results.data || results.data.length === 0) {
                        reject(new Error('CSV vacio o no se pudo leer'));
                        return;
                    }
                    
                    if (!results.data[0]) {
                        reject(new Error('Primera fila undefined'));
                        return;
                    }
                    
                    globalData = results.data;
                    this.processData();
                    resolve(globalData);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    },

    // Process and structure data
    processData() {
        if (globalData.length === 0) return;
        
        processedData = {
            countries: this.getCountries(),
            years: this.getYears(),
            populationData: this.getPopulationData(),
            gdpData: this.getGDPData(),
            latestYear: this.getLatestYear(),
            statistics: this.calculateStatistics()
        };
    },

    // Get unique countries
    getCountries() {
        const countries = globalData
            .map(row => row['Country Name'])
            .filter(c => c && c !== '');
        return Utils.getUniqueValues(countries);
    },

    // Get available years from column names
    getYears() {
        if (globalData.length === 0) return [];
        
        const headers = Object.keys(globalData[0]);
        const yearPattern = /^\d{4}/;
        const yearColumns = headers.filter(h => yearPattern.test(h));
        const years = yearColumns.map(col => col.substring(0, 4)).sort();
        
        return years;
    },

    // Get latest year
    getLatestYear() {
        const years = this.getYears();
        return years.length > 0 ? years[years.length - 1] : null;
    },

    // Get population data
    getPopulationData() {
        return globalData.filter(row => 
            row['Series Name'] && row['Series Name'].includes('Population')
        );
    },

    // Get GDP data
    getGDPData() {
        return globalData.filter(row => 
            row['Series Name'] && row['Series Name'].includes('GDP per capita')
        );
    },

    // Get data for specific country
    getCountryData(countryName) {
        return globalData.filter(row => row['Country Name'] === countryName);
    },

    // Get data for specific series
    getSeriesData(seriesName) {
        return globalData.filter(row => row['Series Name'] === seriesName);
    },

    // Calculate general statistics
    calculateStatistics() {
        const latestYear = this.getLatestYear();
        if (!latestYear) return {};
        
        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(latestYear));

        const populations = this.getPopulationData()
            .map(row => Utils.parseNumber(row[yearColumn]))
            .filter(n => n !== null);

        const gdpValues = this.getGDPData()
            .map(row => Utils.parseNumber(row[yearColumn]))
            .filter(n => n !== null);

        return {
            totalCountries: this.getCountries().length,
            totalRecords: globalData.length,
            avgPopulation: Utils.mean(populations),
            avgGDP: Utils.mean(gdpValues),
            minPopulation: populations.length > 0 ? Math.min(...populations) : 0,
            maxPopulation: populations.length > 0 ? Math.max(...populations) : 0,
            minGDP: gdpValues.length > 0 ? Math.min(...gdpValues) : 0,
            maxGDP: gdpValues.length > 0 ? Math.max(...gdpValues) : 0
        };
    },

    // Get top N countries by metric
    getTopCountries(metric, year, n = 10) {
        let data = metric === 'population' ? this.getPopulationData() : this.getGDPData();
        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(year));
        
        return data
            .map(row => ({
                country: row['Country Name'],
                value: Utils.parseNumber(row[yearColumn])
            }))
            .filter(item => item.value !== null)
            .sort((a, b) => b.value - a.value)
            .slice(0, n);
    },

    // Get bottom N countries by metric
    getBottomCountries(metric, year, n = 10) {
        let data = metric === 'population' ? this.getPopulationData() : this.getGDPData();
        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(year));
        
        return data
            .map(row => ({
                country: row['Country Name'],
                value: Utils.parseNumber(row[yearColumn])
            }))
            .filter(item => item.value !== null)
            .sort((a, b) => a.value - b.value)
            .slice(0, n);
    },

    // Get time series for country
    getCountryTimeSeries(countryName, seriesType) {
        const years = this.getYears();
        const data = seriesType === 'population' ? this.getPopulationData() : this.getGDPData();
        const countryData = data.find(row => row['Country Name'] === countryName);
        
        if (!countryData) return { years: [], values: [] };

        const values = years.map(year => {
            const yearColumn = Object.keys(countryData).find(col => col.startsWith(year));
            return Utils.parseNumber(countryData[yearColumn]);
        });
        
        return { years, values };
    },

    // Export data to CSV
    exportToCSV() {
        const csv = Papa.unparse(globalData);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'demographic_data_export.csv';
        a.click();
        window.URL.revokeObjectURL(url);
    },

    // Get processed data
    getProcessedData() {
        return processedData;
    },

    // Get raw data
    getRawData() {
        return globalData;
    }
};