let interestChart = null;
let countryChart = null;

const initInterestPage = async () => {
    try {
        const data = await loadInterestData();
        
        const processed = processInterestData(data);
        const totalInterest = processed.interest.reduce((sum, val) => sum + val, 0);
        const avgInterest = Math.round(totalInterest / processed.interest.length);
        
        const groupedByCountry = groupInterestByCountry(data);
        const topCountry = Object.entries(groupedByCountry)
            .sort((a, b) => b[1] - a[1])[0];
        
        const totalCard = document.getElementById('total-interest');
        if (totalCard) {
            const valueElement = totalCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = formatNumber(totalInterest);
            }
        }
        
        const topCountryCard = document.getElementById('top-country');
        if (topCountryCard) {
            const valueElement = topCountryCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = topCountry ? topCountry[0] : '-';
            }
        }
        
        const avgCard = document.getElementById('avg-interest');
        if (avgCard) {
            const valueElement = avgCard.querySelector('.metric-value');
            if (valueElement) {
                valueElement.textContent = formatNumber(avgInterest);
            }
        }
        
        interestChart = registerChart(createInterestChart('interest-chart', data, 50));
        countryChart = registerChart(createInterestByCountryChart('country-chart', data));
        
    } catch (error) {
        handleError(error, 'Interest Page');
    }
};

document.addEventListener('DOMContentLoaded', initInterestPage);