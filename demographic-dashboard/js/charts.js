// Chart configurations and rendering

const Charts = {
    instances: {},

    defaultOptions: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                    font: { size: 11 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#2C3E50',
                bodyColor: '#6C7A89',
                borderColor: '#E8ECEF',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        label += Utils.formatNumber(context.parsed.y || context.parsed);
                        return label;
                    }
                }
            }
        },
        animation: false
    },

    destroy(chartId) {
        if (this.instances[chartId]) {
            this.instances[chartId].destroy();
            delete this.instances[chartId];
        }
    },

    createBarChart(canvasId, labels, data, label, color) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color,
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { 
                            color: '#6C7A89',
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { color: '#6C7A89' }
                    }
                }
            }
        });
    },

    createHorizontalBarChart(canvasId, labels, data, label, color) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: data,
                    backgroundColor: color,
                    borderWidth: 0,
                    borderRadius: 4
                }]
            },
            options: {
                ...this.defaultOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { 
                            color: '#6C7A89',
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    y: {
                        grid: { display: false, drawBorder: false },
                        ticks: { color: '#6C7A89' }
                    }
                }
            }
        });
    },

    createLineChart(canvasId, labels, datasets) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets.map((ds, i) => ({
                    label: ds.label,
                    data: ds.data,
                    borderColor: ds.color || Utils.getColorPalette(datasets.length)[i],
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 3,
                    pointBackgroundColor: ds.color || Utils.getColorPalette(datasets.length)[i]
                }))
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { 
                            color: '#6C7A89',
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { color: '#6C7A89' }
                    }
                }
            }
        });
    },

    createScatterChart(canvasId, data, xLabel, yLabel) {
        this.destroy(canvasId);
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        this.instances[canvasId] = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Countries',
                    data: data,
                    backgroundColor: '#A8C5E6',
                    borderColor: '#A8C5E6',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                ...this.defaultOptions,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: { display: true, text: xLabel, color: '#6C7A89' },
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { 
                            color: '#6C7A89',
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    y: {
                        title: { display: true, text: yLabel, color: '#6C7A89' },
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { 
                            color: '#6C7A89',
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const point = data[context.dataIndex];
                                return [
                                    `${point.country}`,
                                    `${xLabel}: ${Utils.formatNumber(context.parsed.x)}`,
                                    `${yLabel}: ${Utils.formatNumber(context.parsed.y)}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    },

    renderOverview() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return;

        const topPop = DataLoader.getTopCountries('population', latestYear, 10);
        this.createBarChart(
            'overviewPopChart',
            topPop.map(d => d.country),
            topPop.map(d => d.value),
            'Population',
            '#A8C5E6'
        );

        const topGdp = DataLoader.getTopCountries('gdp', latestYear, 10);
        this.createBarChart(
            'overviewGdpChart',
            topGdp.map(d => d.country),
            topGdp.map(d => d.value),
            'GDP per Capita',
            '#D4A574'
        );
    },

    renderPopulation() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return;

        const topPop = DataLoader.getTopCountries('population', latestYear, 15);
        this.createHorizontalBarChart(
            'populationChart',
            topPop.map(d => d.country),
            topPop.map(d => d.value),
            'Population',
            '#A8C5E6'
        );

        const top5 = DataLoader.getTopCountries('population', latestYear, 5);
        const datasets = top5.map(country => {
            const timeSeries = DataLoader.getCountryTimeSeries(country.country, 'population');
            return {
                label: country.country,
                data: timeSeries.values
            };
        });

        this.createLineChart(
            'populationTrendChart',
            processedData.years,
            datasets
        );
    },

    renderGDP() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return;

        const topGdp = DataLoader.getTopCountries('gdp', latestYear, 15);
        this.createHorizontalBarChart(
            'gdpChart',
            topGdp.map(d => d.country),
            topGdp.map(d => d.value),
            'GDP per Capita',
            '#D4A574'
        );

        const top5 = DataLoader.getTopCountries('gdp', latestYear, 5);
        const datasets = top5.map(country => {
            const timeSeries = DataLoader.getCountryTimeSeries(country.country, 'gdp');
            return {
                label: country.country,
                data: timeSeries.values
            };
        });

        this.createLineChart(
            'gdpTrendChart',
            processedData.years,
            datasets
        );
    },

    renderGrowthRates() {
        const popGrowth = Analytics.calculateGrowthRates('population')
            .sort((a, b) => b.growthRate - a.growthRate)
            .slice(0, 15);

        if (popGrowth.length > 0) {
            this.createHorizontalBarChart(
                'growthRateChart',
                popGrowth.map(d => d.country),
                popGrowth.map(d => d.growthRate),
                'Population Growth Rate (%)',
                '#7CB342'
            );
        }

        const gdpGrowth = Analytics.calculateGrowthRates('gdp')
            .sort((a, b) => b.growthRate - a.growthRate)
            .slice(0, 15);

        if (gdpGrowth.length > 0) {
            this.createHorizontalBarChart(
                'gdpGrowthChart',
                gdpGrowth.map(d => d.country),
                gdpGrowth.map(d => d.growthRate),
                'GDP Growth Rate (%)',
                '#B088B0'
            );
        }
    },

    renderCorrelations() {
        const correlation = Analytics.calculateCorrelation();
        if (correlation.data.length === 0) return;

        const scatterData = correlation.data.map(d => ({
            x: d.population,
            y: d.gdp,
            country: d.country
        }));

        this.createScatterChart(
            'correlationChart',
            scatterData,
            'Population',
            'GDP per Capita'
        );
    },

    renderRankings() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return;

        const topPop = DataLoader.getTopCountries('population', latestYear, 12);
        const bottomPop = DataLoader.getBottomCountries('population', latestYear, 12);
        const topGdp = DataLoader.getTopCountries('gdp', latestYear, 12);
        const bottomGdp = DataLoader.getBottomCountries('gdp', latestYear, 12);

        this.createHorizontalBarChart(
            'topPopulationChart',
            topPop.map(d => d.country),
            topPop.map(d => d.value),
            'Population',
            '#A8C5E6'
        );

        this.createHorizontalBarChart(
            'topGdpChart',
            topGdp.map(d => d.country),
            topGdp.map(d => d.value),
            'GDP per Capita',
            '#7CB342'
        );

        this.createHorizontalBarChart(
            'bottomPopulationChart',
            bottomPop.map(d => d.country),
            bottomPop.map(d => d.value),
            'Population',
            '#E57373'
        );

        this.createHorizontalBarChart(
            'bottomGdpChart',
            bottomGdp.map(d => d.country),
            bottomGdp.map(d => d.value),
            'GDP per Capita',
            '#FFD54F'
        );
    },

    renderDistributions() {
        const latestYear = processedData.latestYear;
        if (!latestYear) return;

        const yearColumn = Object.keys(globalData[0]).find(col => col.startsWith(latestYear));

        const popValues = processedData.populationData
            .map(row => Utils.parseNumber(row[yearColumn]))
            .filter(v => v !== null && !isNaN(v) && v > 0);

        const popDist = Analytics.createDistribution(popValues, 12);

        if (popDist.labels.length > 0) {
            this.createBarChart(
                'populationDistChart',
                popDist.labels,
                popDist.counts,
                'Frequency',
                '#A8C5E6'
            );
        }

        const gdpValues = processedData.gdpData
            .map(row => Utils.parseNumber(row[yearColumn]))
            .filter(v => v !== null && !isNaN(v) && v > 0);

        const gdpDist = Analytics.createDistribution(gdpValues, 12);

        if (gdpDist.labels.length > 0) {
            this.createBarChart(
                'gdpDistChart',
                gdpDist.labels,
                gdpDist.counts,
                'Frequency',
                '#D4A574'
            );
        }
    },

    renderTimeSeries() {
        const latestYear = processedData.latestYear;
        
        const allCountries = DataLoader.getTopCountries('population', latestYear, 50);
        const filteredCountries = allCountries.filter(c => c.value > 5000000).slice(0, 10);

        const datasets = filteredCountries.map(country => {
            const popSeries = DataLoader.getCountryTimeSeries(country.country, 'population');
            return {
                label: country.country,
                data: popSeries.values
            };
        });

        this.createLineChart(
            'timeseriesChart',
            processedData.years,
            datasets
        );
    },

    renderClustering() {
        const correlation = Analytics.calculateCorrelation();
        if (correlation.data.length === 0) return;

        const clusteredData = Analytics.kMeansClustering(correlation.data, 3);

        const colors = ['#A8C5E6', '#B088B0', '#7CB342'];
        const datasets = [0, 1, 2].map(cluster => ({
            label: `Cluster ${cluster + 1}`,
            data: clusteredData
                .filter(d => d.cluster === cluster)
                .map(d => ({ x: d.population, y: d.gdp, country: d.country })),
            backgroundColor: colors[cluster],
            borderColor: colors[cluster],
            pointRadius: 6
        }));

        this.destroy('clusteringChart');
        const ctx = document.getElementById('clusteringChart');
        if (!ctx) return;

        this.instances['clusteringChart'] = new Chart(ctx, {
            type: 'scatter',
            data: { datasets },
            options: {
                ...this.defaultOptions,
                scales: {
                    x: {
                        type: 'linear',
                        title: { display: true, text: 'Population', color: '#6C7A89' },
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { color: '#6C7A89' }
                    },
                    y: {
                        title: { display: true, text: 'GDP per Capita', color: '#6C7A89' },
                        grid: { color: '#F5F7FA', drawBorder: false },
                        ticks: { color: '#6C7A89' }
                    }
                }
            }
        });
    },

    renderPredictions() {
        const latestYear = processedData.latestYear;
        const top5 = DataLoader.getTopCountries('population', latestYear, 5);

        const datasets = [];
        top5.forEach((country, i) => {
            const prediction = Analytics.predictFutureValues(country.country, 'population', 5);
            if (prediction) {
                const allYears = [...prediction.historical.map(d => d.year), ...prediction.predictions.map(d => d.year)];
                const allValues = [...prediction.historical.map(d => d.value), ...prediction.predictions.map(d => d.value)];
                
                datasets.push({
                    label: country.country,
                    data: allValues
                });
            }
        });

        const allYears = [...processedData.years.map(y => parseInt(y))];
        const futureYears = Array.from({length: 5}, (_, i) => Math.max(...allYears) + i + 1);
        const combinedYears = [...allYears, ...futureYears];

        this.createLineChart('populationPredictionChart', combinedYears, datasets);

        const top5Gdp = DataLoader.getTopCountries('gdp', latestYear, 5);
        const gdpDatasets = [];

        top5Gdp.forEach(country => {
            const prediction = Analytics.predictFutureValues(country.country, 'gdp', 5);
            if (prediction) {
                const allValues = [...prediction.historical.map(d => d.value), ...prediction.predictions.map(d => d.value)];
                gdpDatasets.push({
                    label: country.country,
                    data: allValues
                });
            }
        });

        this.createLineChart('gdpPredictionChart', combinedYears, gdpDatasets);
    },

    renderAnomalies() {
        const popAnomalies = Analytics.detectAnomalies('population').slice(0, 15);
        
        if (popAnomalies.length > 0) {
            this.createHorizontalBarChart(
                'populationAnomalyChart',
                popAnomalies.map(d => d.country),
                popAnomalies.map(d => d.value),
                'Population (Outliers)',
                '#E57373'
            );
        }

        const gdpAnomalies = Analytics.detectAnomalies('gdp').slice(0, 15);
        
        if (gdpAnomalies.length > 0) {
            this.createHorizontalBarChart(
                'gdpAnomalyChart',
                gdpAnomalies.map(d => d.country),
                gdpAnomalies.map(d => d.value),
                'GDP per Capita (Outliers)',
                '#FFD54F'
            );
        }
    },

    renderCustomMetrics() {
        const density = Analytics.calculateEconomicDensity().slice(0, 12);
        if (density.length > 0) {
            this.createHorizontalBarChart(
                'densityIndexChart',
                density.map(d => d.country),
                density.map(d => d.density),
                'Economic Density Index',
                '#A8C5E6'
            );
        }

        const velocity = Analytics.calculateDevelopmentVelocity().slice(0, 12);
        if (velocity.length > 0) {
            this.createHorizontalBarChart(
                'velocityScoreChart',
                velocity.map(d => d.country),
                velocity.map(d => d.velocity),
                'Development Velocity (%)',
                '#B088B0'
            );
        }

        const stability = Analytics.calculateStabilityIndex().slice(0, 12);
        if (stability.length > 0) {
            this.createHorizontalBarChart(
                'stabilityIndexChart',
                stability.map(d => d.country),
                stability.map(d => d.stability),
                'Stability Index',
                '#7CB342'
            );
        }

        const momentum = Analytics.calculateGrowthMomentum().slice(0, 12);
        if (momentum.length > 0) {
            this.createHorizontalBarChart(
                'momentumChart',
                momentum.map(d => d.country),
                momentum.map(d => d.momentum),
                'Growth Momentum',
                '#D4A574'
            );
        }
    },

    renderComparison(selectedCountries) {
        if (selectedCountries.length === 0) return;

        const datasets = selectedCountries.map(country => {
            const timeSeries = DataLoader.getCountryTimeSeries(country, 'population');
            return {
                label: country,
                data: timeSeries.values
            };
        });

        this.createLineChart(
            'comparisonChart',
            processedData.years,
            datasets
        );
    }
};