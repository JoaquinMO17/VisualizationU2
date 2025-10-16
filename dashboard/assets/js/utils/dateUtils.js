const parseDate = (dateString) => {
    return new Date(dateString);
};

const getDateRange = (data) => {
    const dates = data.map(row => new Date(row.Date)).filter(d => !isNaN(d));
    if (dates.length === 0) return null;
    
    return {
        start: new Date(Math.min(...dates)),
        end: new Date(Math.max(...dates))
    };
};

const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

const filterByDays = (data, days) => {
    const cutoffDate = getDaysAgo(days);
    return data.filter(row => {
        const rowDate = new Date(row.Date);
        return rowDate >= cutoffDate;
    });
};

const sortByDate = (data, ascending = true) => {
    return [...data].sort((a, b) => {
        const dateA = new Date(a.Date);
        const dateB = new Date(b.Date);
        return ascending ? dateA - dateB : dateB - dateA;
    });
};

const getLatestDate = (data) => {
    const dates = data.map(row => new Date(row.Date)).filter(d => !isNaN(d));
    if (dates.length === 0) return null;
    return new Date(Math.max(...dates));
};

const getOldestDate = (data) => {
    const dates = data.map(row => new Date(row.Date)).filter(d => !isNaN(d));
    if (dates.length === 0) return null;
    return new Date(Math.min(...dates));
};