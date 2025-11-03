import { DataManager } from './data/dataManager.js';
import { renderHeroNetwork } from './visualizations/heroNetwork.js';
import { renderMetricCards } from './visualizations/metricCards.js';
import { renderRadialComparison } from './visualizations/radialComparison.js';
import { renderSmoothDistribution } from './visualizations/smoothDistribution.js';
import { renderCommunityCircles } from './visualizations/communityCircles.js';
import { renderInfluenceFlow } from './visualizations/influenceFlow.js';
import { renderNodeRanking } from './visualizations/nodeRanking.js';

class Dashboard {
  constructor() {
    this.dataManager = new DataManager();
    this.init();
  }
  
  async init() {
    try {
      console.log('Loading data...');
      await this.dataManager.loadAll();
      console.log('Data loaded successfully');
      
      this.render();
    } catch (error) {
      console.error('Failed to initialize dashboard:', error);
      this.showError();
    }
  }
  
  render() {
    console.log('Rendering visualizations...');
    
    // Render all visualizations
    renderHeroNetwork(this.dataManager.getNetwork());
    renderMetricCards(this.dataManager.getNetwork());
    renderRadialComparison(this.dataManager.getCentrality());
    renderSmoothDistribution(this.dataManager.getClustering());
    renderCommunityCircles(this.dataManager.getCommunities());
    renderInfluenceFlow(this.dataManager.getInfluence());
    renderNodeRanking(this.dataManager.getTopNodes());
    
    console.log('Dashboard rendered successfully');
  }
  
  showError() {
    document.querySelector('.main-content').innerHTML = `
      <div style="text-align: center; padding: 100px 20px;">
        <h2 style="color: #3D3D3D; margin-bottom: 16px;">Failed to Load Data</h2>
        <p style="color: #7A7A7A;">Please ensure all data files are present in assets/data/</p>
      </div>
    `;
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
});