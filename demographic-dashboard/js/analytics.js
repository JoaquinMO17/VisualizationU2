// Advanced analytics and calculations

const Analytics = {
    // Calculate growth rates for all countries
    calculateGrowthRates(seriesType = 'population') {
        const years = processedData.years;
        if (years.length < 2) return [];

        const data = seriesType === 'population' ? 
            processedData.populationData : processedData.gdpData;

        const firstYear = years[0];
        const lastYear = years[years.length - 1];
        const firstYearCol = Object.keys(globalData[0]).find(col => col.startsWith(firstYear));
        const lastYearCol = Object.keys(globalData[0]).find(col => col.startsWith(lastYear));

        return data.map(row => {
            const country = row['Country Name'];
            const firstValue = Utils.parseNumber(row[firstYearCol]);
            const lastValue = Utils.parseNumber(row[lastYearCol]);
            
            if (firstValue && lastValue && firstValue > 0) {
                const growthRate = Utils.calculateGrowthRate(firstValue, lastValue);
                return { country, growthRate, firstValue, lastValue };
            }
            return null;
        }).filter(item => item !== null && !isNaN(item.growthRate));
    },

    // Calculate correlation between population and GDP
    calculateCorrelation() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return { coefficient: 0, data: [] };

        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(latestYear));
        const countries = processedData.countries;
        const correlationData = [];

        countries.forEach(country => {
            const popData = processedData.populationData.find(r => r['Country Name'] === country);
            const gdpData = processedData.gdpData.find(r => r['Country Name'] === country);

            if (popData && gdpData) {
                const population = Utils.parseNumber(popData[yearColumn]);
                const gdp = Utils.parseNumber(gdpData[yearColumn]);

                if (population && gdp && population > 0 && gdp > 0) {
                    correlationData.push({ country, population, gdp });
                }
            }
        });

        if (correlationData.length < 2) return { coefficient: 0, data: correlationData };

        const popValues = correlationData.map(d => d.population);
        const gdpValues = correlationData.map(d => d.gdp);

        const meanPop = Utils.mean(popValues);
        const meanGdp = Utils.mean(gdpValues);

        let numerator = 0;
        let denomPop = 0;
        let denomGdp = 0;

        for (let i = 0; i < correlationData.length; i++) {
            const popDiff = popValues[i] - meanPop;
            const gdpDiff = gdpValues[i] - meanGdp;
            numerator += popDiff * gdpDiff;
            denomPop += popDiff * popDiff;
            denomGdp += gdpDiff * gdpDiff;
        }

        const coefficient = numerator / Math.sqrt(denomPop * denomGdp);

        return { coefficient, data: correlationData };
    },

    // Create distribution bins
    createDistribution(values, bins = 10) {
        const validValues = values.filter(v => v !== null && !isNaN(v) && v > 0);
        if (validValues.length === 0) return { labels: [], counts: [] };

        const min = Math.min(...validValues);
        const max = Math.max(...validValues);
        
        if (min === max) return { labels: [Utils.formatNumber(min)], counts: [validValues.length] };

        const binSize = (max - min) / bins;
        const distribution = Array(bins).fill(0);
        const labels = [];

        for (let i = 0; i < bins; i++) {
            const lower = min + i * binSize;
            const upper = lower + binSize;
            labels.push(`${Utils.formatNumber(lower)}`);
        }

        validValues.forEach(value => {
            let binIndex = Math.floor((value - min) / binSize);
            if (binIndex >= bins) binIndex = bins - 1;
            if (binIndex < 0) binIndex = 0;
            distribution[binIndex]++;
        });

        return { labels, counts: distribution };
    },

    // Simple K-means clustering
    kMeansClustering(data, k = 3) {
        if (data.length < k) {
            return data.map((d, i) => ({ ...d, cluster: i % k }));
        }

        // Normalize data
        const popValues = data.map(d => d.population);
        const gdpValues = data.map(d => d.gdp);
        
        const minPop = Math.min(...popValues);
        const maxPop = Math.max(...popValues);
        const minGdp = Math.min(...gdpValues);
        const maxGdp = Math.max(...gdpValues);

        const normalizedData = data.map(d => ({
            ...d,
            normPop: maxPop > minPop ? (d.population - minPop) / (maxPop - minPop) : 0.5,
            normGdp: maxGdp > minGdp ? (d.gdp - minGdp) / (maxGdp - minGdp) : 0.5
        }));

        // Initialize centroids randomly
        let centroids = [];
        const used = new Set();
        while (centroids.length < k) {
            const idx = Math.floor(Math.random() * normalizedData.length);
            if (!used.has(idx)) {
                centroids.push({
                    normPop: normalizedData[idx].normPop,
                    normGdp: normalizedData[idx].normGdp
                });
                used.add(idx);
            }
        }

        // Run k-means iterations
        for (let iter = 0; iter < 20; iter++) {
            // Assign points to nearest centroid
            normalizedData.forEach(point => {
                let minDist = Infinity;
                let cluster = 0;

                centroids.forEach((centroid, i) => {
                    const dist = Math.sqrt(
                        Math.pow(point.normPop - centroid.normPop, 2) +
                        Math.pow(point.normGdp - centroid.normGdp, 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        cluster = i;
                    }
                });

                point.cluster = cluster;
            });

            // Update centroids
            for (let i = 0; i < k; i++) {
                const clusterPoints = normalizedData.filter(p => p.cluster === i);
                if (clusterPoints.length > 0) {
                    centroids[i] = {
                        normPop: Utils.mean(clusterPoints.map(p => p.normPop)),
                        normGdp: Utils.mean(clusterPoints.map(p => p.normGdp))
                    };
                }
            }
        }

        return normalizedData;
    },

    // Predict future values using linear regression
    predictFutureValues(countryName, seriesType, yearsAhead = 5) {
        const timeSeries = DataLoader.getCountryTimeSeries(countryName, seriesType);
        if (timeSeries.values.length < 2) return null;

        const validData = timeSeries.years
            .map((year, i) => ({ year: parseInt(year), value: timeSeries.values[i] }))
            .filter(d => d.value !== null && !isNaN(d.value) && d.value > 0);

        if (validData.length < 2) return null;

        const x = validData.map(d => d.year);
        const y = validData.map(d => d.value);

        const regression = Utils.linearRegression(x, y);
        
        const lastYear = Math.max(...x);
        const predictions = [];
        
        for (let i = 1; i <= yearsAhead; i++) {
            const futureYear = lastYear + i;
            const predictedValue = Utils.predict(regression, futureYear);
            predictions.push({ year: futureYear, value: Math.max(0, predictedValue) });
        }

        return { historical: validData, predictions, regression };
    },

    // Detect anomalies
    detectAnomalies(seriesType = 'population') {
        const latestYear = processedData.latestYear;
        if (!latestYear) return [];

        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(latestYear));
        const data = seriesType === 'population' ? 
            processedData.populationData : processedData.gdpData;

        const values = data
            .map(row => Utils.parseNumber(row[yearColumn]))
            .filter(v => v !== null && !isNaN(v) && v > 0);

        if (values.length < 4) return [];

        const outlierValues = Utils.detectOutliers(values);
        
        if (outlierValues.length === 0) {
            // If no outliers, return top and bottom 5
            const sorted = [...data]
                .map(row => ({
                    country: row['Country Name'],
                    value: Utils.parseNumber(row[yearColumn])
                }))
                .filter(item => item.value !== null && !isNaN(item.value))
                .sort((a, b) => b.value - a.value);
            
            return [...sorted.slice(0, 5), ...sorted.slice(-5)];
        }
        
        return data
            .filter(row => {
                const value = Utils.parseNumber(row[yearColumn]);
                return outlierValues.includes(value);
            })
            .map(row => ({
                country: row['Country Name'],
                value: Utils.parseNumber(row[yearColumn])
            }));
    },

    // Calculate custom metric: Economic Density Index
    calculateEconomicDensity() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return [];

        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(latestYear));
        const countries = processedData.countries;
        const densityIndex = [];

        countries.forEach(country => {
            const popData = processedData.populationData.find(r => r['Country Name'] === country);
            const gdpData = processedData.gdpData.find(r => r['Country Name'] === country);

            if (popData && gdpData) {
                const population = Utils.parseNumber(popData[yearColumn]);
                const gdp = Utils.parseNumber(gdpData[yearColumn]);

                if (population && gdp && population > 1000 && gdp > 0) {
                    const logPop = Math.log10(population);
                    const density = gdp / logPop;
                    if (!isNaN(density) && isFinite(density)) {
                        densityIndex.push({ country, density });
                    }
                }
            }
        });

        return densityIndex.sort((a, b) => b.density - a.density);
    },

    // Calculate Development Velocity Score
    calculateDevelopmentVelocity() {
        const years = processedData.years;
        if (years.length < 2) return [];

        const countries = processedData.countries;
        const velocityScores = [];

        countries.forEach(country => {
            const gdpSeries = DataLoader.getCountryTimeSeries(country, 'gdp');
            const validData = gdpSeries.values.filter((v, i) => v !== null && !isNaN(v) && v > 0);

            if (validData.length >= 2) {
                let totalGrowth = 0;
                let count = 0;

                for (let i = 1; i < validData.length; i++) {
                    if (validData[i-1] > 0) {
                        const growth = (validData[i] - validData[i-1]) / validData[i-1];
                        if (!isNaN(growth) && isFinite(growth)) {
                            totalGrowth += growth;
                            count++;
                        }
                    }
                }

                if (count > 0) {
                    const velocity = (totalGrowth / count) * 100;
                    if (!isNaN(velocity) && isFinite(velocity)) {
                        velocityScores.push({ country, velocity });
                    }
                }
            }
        });

        return velocityScores.sort((a, b) => b.velocity - a.velocity);
    },

    // Calculate Stability Index
    calculateStabilityIndex(seriesType = 'gdp') {
        const countries = processedData.countries;
        const stabilityScores = [];

        countries.forEach(country => {
            const timeSeries = DataLoader.getCountryTimeSeries(country, seriesType);
            const validValues = timeSeries.values.filter(v => v !== null && !isNaN(v) && v > 0);

            if (validValues.length >= 3) {
                const mean = Utils.mean(validValues);
                const stdDev = Utils.standardDeviation(validValues);
                
                if (mean > 0 && !isNaN(stdDev)) {
                    const cv = stdDev / mean;
                    const stability = 1 / (1 + cv);
                    if (!isNaN(stability) && isFinite(stability)) {
                        stabilityScores.push({ country, stability });
                    }
                }
            }
        });

        return stabilityScores.sort((a, b) => b.stability - a.stability);
    },

    // Calculate Growth Momentum
    calculateGrowthMomentum() {
        const years = processedData.years;
        if (years.length < 3) return [];

        const countries = processedData.countries;
        const momentumScores = [];

        countries.forEach(country => {
            const popSeries = DataLoader.getCountryTimeSeries(country, 'population');
            const gdpSeries = DataLoader.getCountryTimeSeries(country, 'gdp');

            const validPop = popSeries.values.filter(v => v !== null && !isNaN(v) && v > 0);
            const validGdp = gdpSeries.values.filter(v => v !== null && !isNaN(v) && v > 0);

            if (validPop.length >= 3 && validGdp.length >= 3) {
                const recentPopGrowth = Utils.calculateGrowthRate(
                    validPop[validPop.length - 3],
                    validPop[validPop.length - 1]
                );
                const recentGdpGrowth = Utils.calculateGrowthRate(
                    validGdp[validGdp.length - 3],
                    validGdp[validGdp.length - 1]
                );

                if (recentPopGrowth !== null && recentGdpGrowth !== null && 
                    !isNaN(recentPopGrowth) && !isNaN(recentGdpGrowth)) {
                    const momentum = (recentGdpGrowth * 0.7) + (recentPopGrowth * 0.3);
                    if (!isNaN(momentum) && isFinite(momentum)) {
                        momentumScores.push({ country, momentum });
                    }
                }
            }
        });

        return momentumScores.sort((a, b) => b.momentum - a.momentum);
    }
};