// Main application logic

let selectedCountriesForComparison = [];

// Initialize application
function init() {
    setupEventListeners();
    loadDefaultData();
}

// Setup event listeners
function setupEventListeners() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', handleMenuClick);
    });

    document.getElementById('csvFile').addEventListener('change', handleFileUpload);

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            DataLoader.exportToCSV();
        });
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// Handle menu click
function handleMenuClick(e) {
    e.preventDefault();
    
    const viewName = e.currentTarget.dataset.view;
    
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    showView(viewName);
}

// Show view
function showView(viewName) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    const view = document.getElementById(`${viewName}View`);
    if (view) {
        view.classList.add('active');
    }
    
    const titles = {
        overview: 'Overview',
        population: 'Population Analysis',
        gdp: 'GDP Analysis',
        growth: 'Growth Rates',
        correlations: 'Correlations',
        rankings: 'Rankings',
        distributions: 'Distributions',
        timeseries: 'Time Series Analysis',
        clustering: 'Country Clustering',
        predictions: 'Predictions & Forecasting',
        anomalies: 'Anomaly Detection',
        metrics: 'Custom Metrics',
        comparison: 'Country Comparison',
        data: 'Raw Data'
    };
    
    document.getElementById('viewTitle').textContent = titles[viewName] || 'Dashboard';
    
    renderViewCharts(viewName);
}

// Render charts for specific view
function renderViewCharts(viewName) {
    if (!processedData.latestYear) return;
    
    try {
        switch(viewName) {
            case 'overview':
                Charts.renderOverview();
                break;
            case 'population':
                Charts.renderPopulation();
                break;
            case 'gdp':
                Charts.renderGDP();
                break;
            case 'growth':
                Charts.renderGrowthRates();
                break;
            case 'correlations':
                Charts.renderCorrelations();
                break;
            case 'rankings':
                Charts.renderRankings();
                break;
            case 'distributions':
                Charts.renderDistributions();
                break;
            case 'timeseries':
                Charts.renderTimeSeries();
                break;
            case 'clustering':
                Charts.renderClustering();
                break;
            case 'predictions':
                Charts.renderPredictions();
                break;
            case 'anomalies':
                Charts.renderAnomalies();
                break;
            case 'metrics':
                Charts.renderCustomMetrics();
                break;
            case 'comparison':
                setupCountrySelector();
                break;
            case 'data':
                renderDataTable();
                break;
        }
    } catch (error) {
        console.error('Error al renderizar graficas:', error);
    }
}

// Handle file upload
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    updateDataStatus('Loading...');
    
    DataLoader.loadCSV(file)
        .then(() => {
            updateDataStatus('Data loaded successfully');
            updateStatistics();
            showView('overview');
        })
        .catch(error => {
            updateDataStatus('Error loading data');
        });
}

// Load default data
function loadDefaultData() {
    updateDataStatus('Loading default data...');
    
    const csvPath = 'data/Demographic.csv';
    
    DataLoader.loadCSVFromPath(csvPath)
        .then(() => {
            updateDataStatus(`Loaded ${processedData.countries.length} countries`);
            updateStatistics();
            Charts.renderOverview();
        })
        .catch(error => {
            updateDataStatus('No data loaded - Please upload CSV');
        });
}

// Update statistics in overview
function updateStatistics() {
    const stats = processedData.statistics;
    
    document.getElementById('totalCountries').textContent = stats.totalCountries || 0;
    document.getElementById('latestYear').textContent = processedData.latestYear || '-';
    document.getElementById('avgPopulation').textContent = Utils.formatNumber(stats.avgPopulation);
    document.getElementById('totalRecords').textContent = stats.totalRecords || 0;
}

// Update data status
function updateDataStatus(message) {
    document.getElementById('dataStatus').textContent = message;
}

// Setup country selector for comparison
function setupCountrySelector() {
    const selector = document.getElementById('countrySelector');
    if (!selector) return;
    
    selector.innerHTML = '';
    selectedCountriesForComparison = [];
    
    const countries = processedData.countries.slice(0, 30);
    
    countries.forEach(country => {
        const label = document.createElement('label');
        label.className = 'country-checkbox';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = country;
        checkbox.addEventListener('change', handleCountrySelection);
        
        const text = document.createTextNode(country);
        
        label.appendChild(checkbox);
        label.appendChild(text);
        selector.appendChild(label);
    });
}

// Handle country selection for comparison
function handleCountrySelection(e) {
    const country = e.target.value;
    
    if (e.target.checked) {
        if (selectedCountriesForComparison.length < 5) {
            selectedCountriesForComparison.push(country);
        } else {
            e.target.checked = false;
            alert('Maximum 5 countries can be selected');
            return;
        }
    } else {
        selectedCountriesForComparison = selectedCountriesForComparison.filter(c => c !== country);
    }
    
    Charts.renderComparison(selectedCountriesForComparison);
}

// Render data table
function renderDataTable() {
    const table = document.getElementById('dataTable');
    if (!table) return;
    
    const thead = document.getElementById('tableHead');
    const tbody = document.getElementById('tableBody');
    
    const data = DataLoader.getRawData();
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    thead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
    
    tbody.innerHTML = data.slice(0, 100).map(row => {
        return '<tr>' + headers.map(h => `<td>${row[h] || ''}</td>`).join('') + '</tr>';
    }).join('');
}

// Handle search in data table
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tbody = document.getElementById('tableBody');
    const rows = tbody.getElementsByTagName('tr');
    
    Array.from(rows).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);