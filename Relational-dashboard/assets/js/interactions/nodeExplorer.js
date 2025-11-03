import { tooltip } from './tooltips.js';
import { formatters } from '../utils/formatters.js';

export class NodeExplorer {
  constructor() {
    this.selectedNode = null;
    this.callbacks = [];
  }
  
  selectNode(node) {
    this.selectedNode = node;
    this.notifyCallbacks();
  }
  
  getSelectedNode() {
    return this.selectedNode;
  }
  
  clearSelection() {
    this.selectedNode = null;
    this.notifyCallbacks();
  }
  
  onNodeSelect(callback) {
    this.callbacks.push(callback);
  }
  
  notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.selectedNode));
  }
  
  showNodeDetails(node, event) {
    const content = `
      <div style="min-width: 180px;">
        <strong style="font-size: 14px;">Node ${node.id}</strong>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #E8E4DF;">
          <div style="margin-bottom: 4px;">
            <span style="color: #7A7A7A;">Community:</span>
            <strong style="float: right;">${node.community}</strong>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #7A7A7A;">Degree:</span>
            <strong style="float: right;">${formatters.decimal(node.degree, 4)}</strong>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #7A7A7A;">Betweenness:</span>
            <strong style="float: right;">${formatters.decimal(node.betweenness, 4)}</strong>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #7A7A7A;">Closeness:</span>
            <strong style="float: right;">${formatters.decimal(node.closeness, 4)}</strong>
          </div>
          <div>
            <span style="color: #7A7A7A;">PageRank:</span>
            <strong style="float: right;">${formatters.decimal(node.pagerank, 4)}</strong>
          </div>
        </div>
      </div>
    `;
    
    tooltip.show(content, event);
  }
  
  hideNodeDetails() {
    tooltip.hide();
  }
}

export const nodeExplorer = new NodeExplorer();