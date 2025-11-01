import { theme } from '../config/theme.js';
import { formatters } from '../utils/formatters.js';
import { tooltip } from '../interactions/tooltips.js';

export function renderNodeRanking(data) {
  const container = d3.select('#node-ranking');
  container.html('');
  
  const rankingContainer = container.append('div')
    .attr('class', 'node-ranking-container');
  
  // Sort nodes by degree (or any other metric)
  const sortedNodes = [...data.nodes].sort((a, b) => b.degree - a.degree).slice(0, 10);
  
  // Get max values for normalization
  const maxDegree = d3.max(sortedNodes, d => d.degree);
  const maxBetweenness = d3.max(sortedNodes, d => d.betweenness);
  const maxCloseness = d3.max(sortedNodes, d => d.closeness);
  const maxPageRank = d3.max(sortedNodes, d => d.pagerank);
  
  sortedNodes.forEach((node, index) => {
    const item = rankingContainer.append('div')
      .attr('class', 'ranking-item');
    
    // Position
    item.append('div')
      .attr('class', 'ranking-position')
      .text(index + 1);
    
    // Node info
    const nodeInfo = item.append('div')
      .attr('class', 'ranking-node-info');
    
    nodeInfo.append('div')
      .attr('class', 'ranking-node-id')
      .text(`Node ${node.id}`);
    
    // Metrics
    const metricsDiv = nodeInfo.append('div')
      .attr('class', 'ranking-metrics');
    
    const metrics = [
      { label: 'Degree', value: node.degree, max: maxDegree },
      { label: 'Between', value: node.betweenness, max: maxBetweenness },
      { label: 'Close', value: node.closeness, max: maxCloseness },
      { label: 'PageRank', value: node.pagerank, max: maxPageRank }
    ];
    
    metrics.forEach(metric => {
      const metricDiv = metricsDiv.append('div')
        .attr('class', 'ranking-metric');
      
      metricDiv.append('div')
        .attr('class', 'ranking-metric-label')
        .text(metric.label);
      
      metricDiv.append('div')
        .attr('class', 'ranking-metric-value')
        .text(formatters.decimal(metric.value, 4));
    });
    
    // Progress bar
    const barContainer = nodeInfo.append('div')
      .attr('class', 'ranking-bar');
    
    const barFill = barContainer.append('div')
      .attr('class', 'ranking-bar-fill')
      .style('width', '0%');
    
    // Animate bar
    setTimeout(() => {
      barFill.transition()
        .duration(750)
        .delay(index * 50)
        .style('width', `${(node.degree / maxDegree) * 100}%`);
    }, 100);
    
    // Hover effect
    item.on('mouseover', function(event) {
      d3.select(this).style('background-color', theme.colors.cream);
    })
    .on('mouseout', function() {
      d3.select(this).style('background-color', 'transparent');
    });
  });
}