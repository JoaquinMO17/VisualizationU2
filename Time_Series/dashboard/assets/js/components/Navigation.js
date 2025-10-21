const getIconSVG = (iconType) => {
    const icons = {
        grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        btc: '<circle cx="12" cy="12" r="10"/><path d="M9 8h4a2 2 0 012 2v1a2 2 0 01-2 2H9"/><path d="M9 13h4a2 2 0 012 2v1a2 2 0 01-2 2H9"/><path d="M11 4v2m0 12v2"/>',
        eth: '<polygon points="12,2 6,13 12,17 18,13"/><polygon points="12,17 6,13 12,22 18,13"/>',
        doge: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/>',
        chart: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'
    };
    return icons[iconType] || '';
};

const setActiveNavigation = (pageId) => {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `${pageId}.html` || (pageId === 'index' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

const getCurrentPage = () => {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    return page.replace('.html', '') || 'index';
};

document.addEventListener('DOMContentLoaded', () => {
    const currentPage = getCurrentPage();
    setActiveNavigation(currentPage);
});