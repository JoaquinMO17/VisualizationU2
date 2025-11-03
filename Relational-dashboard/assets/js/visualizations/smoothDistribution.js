import { theme } from '../config/theme.js';
import { chartDefaults } from '../config/chartDefaults.js';
import { formatters } from '../utils/formatters.js';

export function renderSmoothDistribution(data) {
  const container = d3.select('#distribution-area');
  container.html('');
  
  const width = container.node().offsetWidth;
  const height = 350;
  const margin = chartDefaults.margin;
  
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data.values, d => d.x))
    .range([0, innerWidth]);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.values, d => d.y)])
    .range([innerHeight, 0]);
  
  // Create area generator
  const area = d3.area()
    .x(d => xScale(d.x))
    .y0(innerHeight)
    .y1(d => yScale(d.y))
    .curve(d3.curveBasis);
  
  // Create line generator
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveBasis);
  
  // Add grid
  g.append('g')
    .attr('class', 'distribution-grid')
    .selectAll('line')
    .data(yScale.ticks(5))
    .join('line')
    .attr('x1', 0)
    .attr('x2', innerWidth)
    .attr('y1', d => yScale(d))
    .attr('y2', d => yScale(d))
    .style('stroke', theme.colors.border)
    .style('stroke-dasharray', '2,2')
    .style('opacity', 0.5);
  
  // Add area
  g.append('path')
    .datum(data.values)
    .attr('class', 'distribution-area')
    .attr('d', area)
    .style('fill', theme.colors.primary);
  
  // Add line
  g.append('path')
    .datum(data.values)
    .attr('class', 'distribution-line')
    .attr('d', line)
    .style('stroke', theme.colors.highlight)
    .style('fill', 'none')
    .style('stroke-width', 2);
  
  // Add axes
  const xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickFormat(d => formatters.decimal(d, 2));
  
  const yAxis = d3.axisLeft(yScale)
    .ticks(5);
  
  g.append('g')
    .attr('class', 'distribution-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis)
    .selectAll('text')
    .style('fill', theme.colors.text.secondary)
    .style('font-size', `${theme.fontSize.sm}px`);
  
  g.append('g')
    .attr('class', 'distribution-axis')
    .call(yAxis)
    .selectAll('text')
    .style('fill', theme.colors.text.secondary)
    .style('font-size', `${theme.fontSize.sm}px`);
  
  // Add mean line
  if (data.mean) {
    g.append('line')
      .attr('class', 'distribution-annotation-line')
      .attr('x1', xScale(data.mean))
      .attr('x2', xScale(data.mean))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .style('stroke', theme.colors.text.tertiary)
      .style('stroke-dasharray', '4,4');
    
    g.append('text')
      .attr('class', 'distribution-annotation')
      .attr('x', xScale(data.mean) + 5)
      .attr('y', 15)
      .text(`Mean: ${formatters.decimal(data.mean, 4)}`)
      .style('fill', theme.colors.text.tertiary);
  }
  
  // Add axis labels
  g.append('text')
    .attr('class', 'distribution-label')
    .attr('x', innerWidth / 2)
    .attr('y', innerHeight + 35)
    .attr('text-anchor', 'middle')
    .text('Clustering Coefficient')
    .style('fill', theme.colors.text.secondary);
  
  g.append('text')
    .attr('class', 'distribution-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -innerHeight / 2)
    .attr('y', -50)
    .attr('text-anchor', 'middle')
    .text('Frequency')
    .style('fill', theme.colors.text.secondary);
}