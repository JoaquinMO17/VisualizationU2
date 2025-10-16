const COLORS = {
    background: '#FFFFFF',
    cardBg: '#F8F9FA',
    border: '#E5E7EB',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    btc: '#F7931A',
    eth: '#627EEA',
    doge: '#C2A633',
    positive: '#10B981',
    negative: '#EF4444',
    neutral: '#6B7280'
};

const DATA_PATHS = {
    btc: 'assets/data/btc_usd_5y.csv',
    eth: 'assets/data/eth_usd_5y.csv',
    doge: 'assets/data/doge_usd_5y.csv',
    interest: 'assets/data/crypto_interest_global.csv'
};

const CHART_FONTS = {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    size: 12,
    weight: '400'
};

const NAVIGATION_ITEMS = [
    { id: 'overview', label: 'Overview', page: 'index.html', icon: 'grid' },
    { id: 'bitcoin', label: 'Bitcoin', page: 'btc.html', icon: 'btc' },
    { id: 'ethereum', label: 'Ethereum', page: 'eth.html', icon: 'eth' },
    { id: 'dogecoin', label: 'Dogecoin', page: 'doge.html', icon: 'doge' },
    { id: 'interest', label: 'Interest', page: 'interest.html', icon: 'chart' }
];

const CRYPTO_INFO = {
    BTC: { name: 'Bitcoin', symbol: 'BTC', color: COLORS.btc },
    ETH: { name: 'Ethereum', symbol: 'ETH', color: COLORS.eth },
    DOGE: { name: 'Dogecoin', symbol: 'DOGE', color: COLORS.doge }
};