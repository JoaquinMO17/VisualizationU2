import { theme } from '../config/theme.js';
import { tooltip } from '../interactions/tooltips.js';
import { formatters } from '../utils/formatters.js';

export function renderHeroNetwork(data) {
  const container = d3.select('#hero-network');
  container.html('');
  
  const width = container.node().offsetWidth;
  const height = container.node().offsetHeight;
  
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Filter to show only top 150 nodes by degree
  const allNodes = data.graph.nodes;
  const topNodes = allNodes
    .sort((a, b) => b.degree - a.degree)
    .slice(0, 150);
  
  const topNodeIds = new Set(topNodes.map(n => n.id));
  
  // Filter links to only include connections between top nodes
  const filteredLinks = data.graph.links.filter(l => 
    topNodeIds.has(l.source.id || l.source) && 
    topNodeIds.has(l.target.id || l.target)
  );
  
  // Define boundaries
  const padding = 50;
  const bounds = {
    minX: padding,
    maxX: width - padding,
    minY: padding,
    maxY: height - padding
  };
  
  // Create force simulation
  const simulation = d3.forceSimulation(topNodes)
    .force('link', d3.forceLink(filteredLinks).id(d => d.id).distance(100))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(12))
    .on('tick', ticked);
  
  // Create links - muy sutiles
  const link = svg.append('g')
    .selectAll('line')
    .data(filteredLinks)
    .join('line')
    .attr('stroke', '#E0E0E0')
    .attr('stroke-width', 0.5)
    .attr('stroke-opacity', 0.3);
  
  // Create nodes - sin bordes
  const node = svg.append('g')
    .selectAll('circle')
    .data(topNodes)
    .join('circle')
    .attr('r', d => 3 + d.degree * 20)
    .attr('fill', d => theme.colors.communities[d.community % theme.colors.communities.length])
    .attr('opacity', 0.8)
    .style('cursor', 'pointer')
    .call(drag(simulation))
    .on('mouseover', function(event, d) {
      // Highlight node
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', d => (3 + d.degree * 20) * 1.5)
        .attr('opacity', 1);
      
      // Dim other nodes
      node.transition().duration(200).attr('opacity', 0.2);
      d3.select(this).transition().duration(200).attr('opacity', 1);
      
      // Highlight connected links
      link
        .transition()
        .duration(200)
        .attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? '#888888' : '#E0E0E0')
        .attr('stroke-width', l => (l.source.id === d.id || l.target.id === d.id) ? 1.5 : 0.5)
        .attr('stroke-opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 0.7 : 0.1);
      
      const content = `
        <div style="min-width: 160px;">
          <strong style="font-size: 14px; color: #2D2D2D;">Node ${d.id}</strong>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #E0E0E0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #888888; font-size: 12px;">Community</span>
              <strong style="font-size: 12px;">${d.community}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #888888; font-size: 12px;">Degree</span>
              <strong style="font-size: 12px;">${formatters.decimal(d.degree, 4)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="color: #888888; font-size: 12px;">Betweenness</span>
              <strong style="font-size: 12px;">${formatters.decimal(d.betweenness, 4)}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #888888; font-size: 12px;">PageRank</span>
              <strong style="font-size: 12px;">${formatters.decimal(d.pagerank, 4)}</strong>
            </div>
          </div>
        </div>
      `;
      tooltip.show(content, event);
    })
    .on('mousemove', (event) => tooltip.move(event))
    .on('mouseout', function() {
      // Reset node
      d3.select(this)
        .transition()
        .duration(200)
        .attr('r', d => 3 + d.degree * 20)
        .attr('opacity', 0.8);
      
      // Reset all nodes
      node.transition().duration(200).attr('opacity', 0.8);
      
      // Reset links
      link
        .transition()
        .duration(200)
        .attr('stroke', '#E0E0E0')
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 0.3);
      
      tooltip.hide();
    });
  
  // Tick function with boundary constraints
  function ticked() {
    topNodes.forEach(d => {
      const radius = 3 + d.degree * 20;
      d.x = Math.max(bounds.minX + radius, Math.min(bounds.maxX - radius, d.x));
      d.y = Math.max(bounds.minY + radius, Math.min(bounds.maxY - radius, d.y));
    });
    
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }
}

function drag(simulation) {
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
  
  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}