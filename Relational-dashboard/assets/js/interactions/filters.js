export class Filters {
  constructor() {
    this.activeFilters = {
      community: null,
      minDegree: 0,
      minBetweenness: 0
    };
    
    this.callbacks = [];
  }
  
  setFilter(key, value) {
    this.activeFilters[key] = value;
    this.notifyCallbacks();
  }
  
  getFilter(key) {
    return this.activeFilters[key];
  }
  
  clearFilters() {
    this.activeFilters = {
      community: null,
      minDegree: 0,
      minBetweenness: 0
    };
    this.notifyCallbacks();
  }
  
  onFilterChange(callback) {
    this.callbacks.push(callback);
  }
  
  notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.activeFilters));
  }
  
  applyFilters(data) {
    return data.filter(d => {
      if (this.activeFilters.community !== null && d.community !== this.activeFilters.community) {
        return false;
      }
      
      if (d.degree < this.activeFilters.minDegree) {
        return false;
      }
      
      if (d.betweenness < this.activeFilters.minBetweenness) {
        return false;
      }
      
      return true;
    });
  }
}

export const filters = new Filters();