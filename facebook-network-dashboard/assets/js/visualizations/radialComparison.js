import { theme } from '../config/theme.js';
import { formatters } from '../utils/formatters.js';
import { tooltip } from '../interactions/tooltips.js';

export function renderRadialComparison(data) {
  const container = d3.select('#radial-comparison');
  container.html('');
  
  const width = container.node().offsetWidth;
  const height = 400;
  const margin = 80;
  
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const g = svg.append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);
  
  const radius = Math.min(width, height) / 2 - margin;
  const axes = ['Degree', 'Closeness', 'Betweenness', 'PageRank'];
  const angleSlice = (Math.PI * 2) / axes.length;
  
  // Radial scale
  const rScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, radius]);
  
  // Draw subtle grid circles
  const levels = 4;
  for (let i = 1; i <= levels; i++) {
    g.append('circle')
      .attr('r', (radius / levels) * i)
      .style('stroke', '#E8E8E8')
      .style('stroke-width', '1')
      .style('fill', 'none');
  }
  
  // Draw axes lines
  axes.forEach((axis, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', y)
      .style('stroke', '#E8E8E8')
      .style('stroke-width', '1');
    
    // Axis labels with better positioning
    const labelRadius = radius + 35;
    const labelX = Math.cos(angle) * labelRadius;
    const labelY = Math.sin(angle) * labelRadius;
    
    g.append('text')
      .attr('x', labelX)
      .attr('y', labelY)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '13px')
      .style('font-weight', '500')
      .style('fill', theme.colors.text.secondary)
      .text(axis);
  });
  
  // Colors for each node - more distinct
  const colors = [
    '#7A7AB8',  // Purple
    '#7AA898',  // Teal
    '#C88878',  // Coral
    '#78A8C8',  // Blue
    '#B87898'   // Rose
  ];
  
  // Draw data areas
  data.nodes.forEach((node, idx) => {
    const values = [
      node.degree,
      node.closeness,
      node.betweenness,
      node.pagerank
    ];
    
    const points = values.map((value, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = rScale(value);
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        value: value,
        axis: axes[i]
      };
    });
    
    // Create path for area
    const areaPath = points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`
    ).join(' ') + ' Z';
    
    // Draw filled area
    g.append('path')
      .attr('d', areaPath)
      .style('fill', colors[idx])
      .style('fill-opacity', 0.1)
      .style('stroke', colors[idx])
      .style('stroke-width', 2)
      .style('stroke-opacity', 0.8)
      .on('mouseover', function() {
        d3.select(this)
          .style('fill-opacity', 0.2)
          .style('stroke-width', 3);
      })
      .on('mouseout', function() {
        d3.select(this)
          .style('fill-opacity', 0.1)
          .style('stroke-width', 2);
      });
    
    // Draw points at vertices
    points.forEach((point, i) => {
      g.append('circle')
        .attr('cx', point.x)
        .attr('cy', point.y)
        .attr('r', 4)
        .style('fill', colors[idx])
        .style('stroke', '#FFFFFF')
        .style('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 6);
          
          const content = `
            <div style="min-width: 140px;">
              <strong style="font-size: 13px; color: #2D2D2D;">Node ${node.id}</strong>
              <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #E0E0E0;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #888888; font-size: 12px;">${point.axis}</span>
                  <strong style="font-size: 12px;">${formatters.decimal(point.value, 4)}</strong>
                </div>
              </div>
            </div>
          `;
          tooltip.show(content, event);
        })
        .on('mousemove', (event) => tooltip.move(event))
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 4);
          tooltip.hide();
        });
    });
  });
  
  // Add cleaner legend
  const legendGroup = svg.append('g')
    .attr('transform', `translate(${width - 110}, 20)`);
  
  data.nodes.forEach((node, idx) => {
    const legendItem = legendGroup.append('g')
      .attr('transform', `translate(0, ${idx * 24})`);
    
    legendItem.append('circle')
      .attr('cx', 6)
      .attr('cy', 0)
      .attr('r', 5)
      .style('fill', colors[idx]);
    
    legendItem.append('text')
      .attr('x', 18)
      .attr('y', 0)
      .attr('dominant-baseline', 'middle')
      .style('font-size', '12px')
      .style('fill', theme.colors.text.secondary)
      .text(`Node ${node.id}`);
  });
}