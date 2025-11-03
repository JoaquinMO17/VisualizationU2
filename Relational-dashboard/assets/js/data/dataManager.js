export class DataManager {
  constructor() {
    this.data = {
      network: null,
      topNodes: null,
      centrality: null,
      clustering: null,
      communities: null,
      influence: null
    };
  }
  
  async loadAll() {
    try {
      const [network, topNodes, centrality, clustering, communities, influence] = await Promise.all([
        this.loadJSON('assets/data/network_structure.json'),
        this.loadJSON('assets/data/top_nodes.json'),
        this.loadJSON('assets/data/centrality_comparison.json'),
        this.loadJSON('assets/data/clustering_distribution.json'),
        this.loadJSON('assets/data/communities.json'),
        this.loadJSON('assets/data/influence_paths.json')
      ]);
      
      this.data.network = network;
      this.data.topNodes = topNodes;
      this.data.centrality = centrality;
      this.data.clustering = clustering;
      this.data.communities = communities;
      this.data.influence = influence;
      
      return this.data;
    } catch (error) {
      console.error('Error loading data:', error);
      throw error;
    }
  }
  
  async loadJSON(path) {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}`);
    }
    return response.json();
  }
  
  getNetwork() {
    return this.data.network;
  }
  
  getTopNodes() {
    return this.data.topNodes;
  }
  
  getCentrality() {
    return this.data.centrality;
  }
  
  getClustering() {
    return this.data.clustering;
  }
  
  getCommunities() {
    return this.data.communities;
  }
  
  getInfluence() {
    return this.data.influence;
  }
}