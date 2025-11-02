# Cryptocurrency Spatiotemporal Analysis

A comprehensive data analysis project examining the relationship between global search interest patterns and cryptocurrency price volatility across multiple countries and digital assets.

## Project Overview

This project investigates the spatiotemporal dynamics of cryptocurrency markets by integrating:
- **Geographic search interest data** from Google Trends (2020-2025)
- **Price and volatility data** for five major cryptocurrencies
- **Statistical time series analysis** including Random Walk tests, ACF, and Cross-Correlation Functions (CCF)

**🔗 [View Interactive Dashboard](https://tarea-javier.github.io/dashboard-time-series/)**

### Key Research Questions

1. Are cryptocurrency prices random walks? What does this imply for investing?
2. Does geographic search interest predict price volatility?
3. Which countries lead global cryptocurrency adoption trends?
4. How do different regions exhibit varying preferences between Bitcoin and altcoins?

## Repository Structure

```
VisualizationU2/
├── data/
│   ├── global_interest/          # Google Trends data by country and cryptocurrency
│   │   ├── Bitcoin_*.csv
│   │   ├── Ethereum_*.csv
│   │   ├── Cardano_*.csv
│   │   ├── Dogecoin_*.csv
│   │   ├── ripple_*.csv
│   │   └── crypto_interest_global.csv  # Merged dataset
│   └── value/                    # 5-year price history (USD)
│       ├── btc_usd_5y.csv
│       ├── eth_usd_5y.csv
│       ├── ada_usd_5y.csv
│       ├── doge_usd_5y.csv
│       └── xrp_usd_5y.csv
├── notebooks/
│   ├── 03_Time_Series_Analysis.ipynb          # Random Walk, ACF, volatility clustering
│   ├── 03_Spatial_Analysis.ipynb              # Geographic patterns and trends
│   └── 03_Spatiotemporal_Integration.ipynb    # CCF analysis and predictive relationships
├── processing scripts/
│   ├── clean_geographic_data.py               # Data cleaning for country-level interest
│   └── merge_geographic_data.py               # Aggregation into unified dataset
├── dashboard/                                  # Interactive web dashboard
│   └── [Dashboard files for visualization]
├── documentation/
│   └── phase3-spatiotemporal-storyboard.pdf   # Full analysis report
├── requirements.txt
└── README.md
```
## AI Disclosure Statement

This disclosure outlines the extent and nature of AI-assisted contributions across all components of the project, including the analytical notebooks, the interactive dashboard, and the accompanying storytelling documentation.

### AI Assistance Breakdown by Component

| Component                                                          | Description                                                                                        | Estimated AI Assistance Level               | Assistance Classification                                                                                                | Human Role                                                                                          |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **03_Time_Series_Analysis.ipynb**                                  | Implements Random Walk tests (ADF), ACF, and volatility clustering analysis on 5 cryptocurrencies. | **≈75% (Level 3 – Significant Assistance)** | AI generated statistical scripts, visualizations (ACF plots, volatility clusters), and result interpretation drafts.     | Human curated parameters, verified statistical assumptions, and refined interpretations.            |
| **03_Spatial_Analysis.ipynb**                                      | Conducts geographic visualization of search interest using Google Trends data.                     | **≈75% (Level 3 – Significant Assistance)** | AI suggested geographic aggregation methods, produced Plotly choropleths, and drafted analytical summaries.              | Human adjusted region classification, data cleaning, and narrative coherence.                       |
| **03_Spatiotemporal_Integration.ipynb**                            | Integrates search interest and volatility data using cross-correlation functions (CCF).            | **≈75% (Level 3 – Significant Assistance)** | AI generated methodological framework (lag structure, correlation windowing), code for CCF analysis, and visual outputs. | Human validated lead–lag interpretations, refined plots, and cross-referenced findings with theory. |
| **Interactive Dashboard**                                          | Web-based data exploration platform showing time series and geographic comparisons.                | **≈10% (Level 1 – Minimal Assistance)**     | AI provided small code snippets for layout and Plotly integration.                                                       | Human manually implemented the full dashboard logic, UX design, and data binding.                   |
| **Storytelling Document** (`phase3-spatiotemporal-storyboard.pdf`) | Analytical report summarizing methods, results, and insights for stakeholders.                     | **≈75% (Level 3 – Significant Assistance)** | AI assisted in structuring sections, generating analytical narratives, and editing text for clarity.                     | Human authored key insights, ensured factual accuracy, and finalized tone and formatting.           |

### Nature of AI Contributions

AI was primarily used for:

Statistical script generation (ADF, ACF, CCF analysis templates)

Visualization design (plot styles, color scales, dashboard structure)

Methodological guidance (data cleaning, feature aggregation, significance thresholds)

Technical documentation drafting (section organization, summary writing)

Language refinement (clarity, conciseness, and tone consistency)

All generated materials underwent human verification and revision, particularly for:

Statistical correctness

Interpretative accuracy

Ethical and data-source integrity

Style consistency across notebooks and documents

## Cryptocurrencies Analyzed

- **Bitcoin (BTC)** - Market leader and benchmark
- **Ethereum (ETH)** - Smart contract platform
- **Cardano (ADA)** - Proof-of-stake blockchain
- **Dogecoin (DOGE)** - Meme-driven cryptocurrency
- **Ripple (XRP)** - Cross-border payment protocol

## Geographic Coverage

**10 Countries/Regions:** Brazil, China, Germany, Great Britain, India, Japan, South Korea, Mexico, Singapore, United States

## Key Findings

### 1. Random Walk Behavior
- **BTC, ETH, ADA, XRP** exhibit non-stationary behavior (p-value > 0.05), confirming random walk properties
- **DOGE** shows stationary tendencies, suggesting mean-reverting behavior
- **Implication:** Traditional technical analysis may have limited predictive power for most cryptocurrencies

### 2. Volatility Clustering
- All cryptocurrencies display significant volatility clustering (autocorrelation in squared returns)
- Periods of high volatility tend to follow high volatility periods
- Justifies use of ARCH/GARCH models for risk forecasting

### 3. Search Interest as a Leading Indicator
- **Global Bitcoin search interest predicts volatility** with a 1-week lead (negative lag in CCF)
- Contemporaneous correlation: r = 0.47 between interest and volatility
- Search spikes precede major price movements, making interest data valuable for early warning systems

### 4. Geographic Leadership
- **United States** emerges as the strongest leading indicator (correlation: 0.78 at lag -1)
- Strong synchronized behavior among developed markets (US, Germany, Japan, Great Britain)
- China and some emerging markets show more idiosyncratic patterns

### 5. Altcoin Preference Patterns
- **South Korea (70.1%)** and **Japan (68.7%)** show highest altcoin preference ratios
- **United States (55.8%)** and **China (58.7%)** remain more Bitcoin-focused
- Regional preferences suggest varying risk appetites and market maturity levels

## Installation

### Prerequisites
- Python 3.8+
- Jupyter Notebook/Lab

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd VisualizationU2

# Install dependencies
pip install -r requirements.txt
```

### Dependencies
```
pandas
plotly
matplotlib
seaborn
numpy
statsmodels
```

## Usage

### 1. Interactive Dashboard

Explore the data interactively via the web dashboard:

**🌐 [Launch Dashboard](https://tarea-javier.github.io/dashboard-time-series/)**

The dashboard provides:
- Real-time visualization of cryptocurrency trends
- Interactive charts for time series analysis
- Geographic interest patterns
- Comparative analysis across cryptocurrencies

### 2. Data Processing
Run the processing scripts to clean and merge raw data:

```python
# Clean individual country files
python "processing scripts/clean_geographic_data.py"

# Merge into unified dataset
python "processing scripts/merge_geographic_data.py"
```

### 3. Analysis Notebooks

Execute notebooks in the following order:

1. **03_Time_Series_Analysis.ipynb**
   - Augmented Dickey-Fuller tests for stationarity
   - ACF plots for prices, returns, and volatility
   - Volatility clustering visualization

2. **03_Spatial_Analysis.ipynb**
   - Choropleth maps of global interest
   - Country-level comparisons by cryptocurrency
   - Temporal trends with moving averages

3. **03_Spatiotemporal_Integration.ipynb**
   - Cross-correlation function (CCF) analysis
   - Lead/lag relationship identification
   - Investment strategy recommendations

## Methodology

### Time Series Analysis
- **Random Walk Test:** Augmented Dickey-Fuller (ADF) test on closing prices
- **Volatility Measurement:** Squared log returns as proxy for volatility
- **Autocorrelation:** ACF analysis on prices, returns, and squared returns

### Spatial Analysis
- **Data Source:** Google Trends weekly search volume (scaled 0-100)
- **Aggregation:** Country-level and global averages with 4-6 week moving averages
- **Correlation Heatmaps:** Pearson correlation matrices for country co-movement

### Spatiotemporal Integration
- **Cross-Correlation Function (CCF):** Identifies lead/lag relationships between:
  - Volatility (X) vs. Global Interest (Y)
  - Country Interest (X) vs. Global Interest (Y)
- **Statistical Significance:** 95% confidence intervals (±2/√N)

## Investment Implications

### Strategy Recommendations

1. **Contrarian Signal (Interest as Lagging Indicator)**
   - High public euphoria following price moves may indicate market tops
   - Use search interest spikes as warning signals for overbought conditions

2. **Leading Country Monitoring**
   - Track US search interest as a 1-week leading indicator
   - Sustained increases in US interest may signal broader global adoption
   - Potential buy signal before wider market participation

3. **Regional Diversification**
   - Consider geographic variations in cryptocurrency preferences
   - Altcoin-focused regions (Korea, Japan) may signal early trends in alternative assets

## Limitations

- Google Trends data is normalized and relative, not absolute
- Search interest ≠ actual trading volume or capital flows
- Analysis covers 2020-2025; market dynamics may evolve
- Correlation does not imply causation
- External factors (regulation, macroeconomic events) not fully captured

## Future Work

- Expand to additional cryptocurrencies and countries
- Integrate social media sentiment analysis
- Incorporate macroeconomic variables (inflation, interest rates)
- Develop predictive machine learning models
- Real-time monitoring dashboard

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Additional cryptocurrencies or geographic regions
- Improved statistical methods
- Enhanced visualizations
- Bug fixes or documentation improvements

## License

This project is available for educational and research purposes.

## Acknowledgments

- **Data Sources:**
  - Google Trends (search interest data)
  - Yahoo Finance / CoinGecko (price data)
- **Libraries:** pandas, statsmodels, plotly, matplotlib, seaborn

## Contact

For questions or collaboration inquiries, please open an issue in this repository.

---

**Note:** This analysis is for educational purposes only and should not be construed as financial advice. Cryptocurrency investments carry significant risk.
