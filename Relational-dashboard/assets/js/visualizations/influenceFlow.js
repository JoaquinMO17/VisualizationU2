import { theme } from '../config/theme.js';
import { tooltip } from '../interactions/tooltips.js';
import { formatters } from '../utils/formatters.js';

export function renderInfluenceFlow(data) {
  const container = d3.select('#influence-flow');
  container.html('');
  
  const width = container.node().offsetWidth;
  const height = 400;
  const margin = { top: 40, right: 20, bottom: 20, left: 20 };
  
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Group nodes by stage
  const stages = [
    { name: 'High Degree', nodes: [], x: innerWidth * 0.15 },
    { name: 'High Betweenness', nodes: [], x: innerWidth * 0.5 },
    { name: 'High PageRank', nodes: [], x: innerWidth * 0.85 }
  ];
  
  data.nodes.forEach(node => {
    stages[node.stage].nodes.push(node);
  });
  
  // Calculate node positions
  stages.forEach((stage, stageIdx) => {
    const nodeHeight = 30;
    const spacing = 10;
    const totalHeight = stage.nodes.length * (nodeHeight + spacing);
    const startY = (innerHeight - totalHeight) / 2;
    
    stage.nodes.forEach((node, idx) => {
      node.x = stage.x;
      node.y = startY + idx * (nodeHeight + spacing);
      node.height = nodeHeight;
      node.width = 80;
    });
  });
  
  // Draw stage labels
  stages.forEach(stage => {
    g.append('text')
      .attr('x', stage.x)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', `${theme.fontSize.sm}px`)
      .style('font-weight', '600')
      .style('fill', theme.colors.text.secondary)
      .text(stage.name);
  });
  
  // Draw connections
  data.links.forEach(link => {
    const source = data.nodes.find(n => n.id === link.source);
    const target = data.nodes.find(n => n.id === link.target);
    
    if (source && target) {
      const path = g.append('path')
        .attr('d', `
          M ${source.x + source.width/2} ${source.y + source.height/2}
          C ${(source.x + target.x)/2} ${source.y + source.height/2},
            ${(source.x + target.x)/2} ${target.y + target.height/2},
            ${target.x - target.width/2} ${target.y + target.height/2}
        `)
        .attr('fill', 'none')
        .attr('stroke', theme.colors.border)
        .attr('stroke-width', Math.max(2, link.value * 10))
        .attr('opacity', 0.2)
        .on('mouseover', function(event) {
          d3.select(this).attr('opacity', 0.5);
          
          const content = `
            <strong>${source.name} → ${target.name}</strong><br/>
            Flow: ${formatters.decimal(link.value, 4)}
          `;
          tooltip.show(content, event);
        })
        .on('mousemove', (event) => tooltip.move(event))
        .on('mouseout', function() {
          d3.select(this).attr('opacity', 0.2);
          tooltip.hide();
        });
    }
  });
  
  // Draw nodes
  const colors = [theme.colors.primary, theme.colors.secondary, theme.colors.accent];
  
  data.nodes.forEach(node => {
    const nodeGroup = g.append('g')
      .attr('transform', `translate(${node.x - node.width/2}, ${node.y})`);
    
    nodeGroup.append('rect')
      .attr('width', node.width)
      .attr('height', node.height)
      .attr('rx', 4)
      .attr('fill', colors[node.stage])
      .attr('stroke', theme.colors.card)
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event) {
        d3.select(this).attr('fill-opacity', 0.8);
        
        const content = `
          <strong>${node.name}</strong><br/>
          Value: ${formatters.decimal(node.value, 4)}
        `;
        tooltip.show(content, event);
      })
      .on('mousemove', (event) => tooltip.move(event))
      .on('mouseout', function() {
        d3.select(this).attr('fill-opacity', 1);
        tooltip.hide();
      });
    
    nodeGroup.append('text')
      .attr('x', node.width / 2)
      .attr('y', node.height / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', `${theme.fontSize.xs}px`)
      .style('fill', theme.colors.text.primary)
      .style('font-weight', '600')
      .style('pointer-events', 'none')
      .text(node.name.replace('Node ', ''));
  });
}