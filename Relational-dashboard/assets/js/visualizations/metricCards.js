import { theme } from '../config/theme.js';
import { formatters } from '../utils/formatters.js';

export function renderMetricCards(data) {
  const container = d3.select('#metric-cards');
  container.html('');
  
  const metrics = [
    {
      label: 'Total Nodes',
      value: data.nodes,
      color: theme.colors.primary,
      format: (v) => formatters.number(v)
    },
    {
      label: 'Total Edges',
      value: data.edges,
      color: theme.colors.secondary,
      format: (v) => formatters.number(v)
    },
    {
      label: 'Network Density',
      value: data.density,
      color: theme.colors.accent,
      format: (v) => formatters.decimal(v, 6)
    },
    {
      label: 'Modularity',
      value: data.modularity,
      color: theme.colors.highlight,
      format: (v) => formatters.decimal(v, 4)
    }
  ];
  
  metrics.forEach((metric, index) => {
    const card = container.append('div')
      .attr('class', 'metric-card');
    
    card.append('div')
      .attr('class', 'metric-card-label')
      .text(metric.label);
    
    card.append('div')
      .attr('class', 'metric-card-value')
      .text(metric.format(metric.value));
    
    // Mini sparkline chart
    const chartDiv = card.append('div')
      .attr('class', 'metric-card-chart');
    
    createMiniChart(chartDiv, metric.color, index);
  });
}

function createMiniChart(container, color, index) {
  const width = container.node().offsetWidth;
  const height = 40;
  
  // Generate sample data for visualization
  const data = Array.from({length: 20}, (_, i) => ({
    x: i,
    y: Math.sin(i * 0.5 + index) * 10 + 20 + Math.random() * 5
  }));
  
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([height, 0]);
  
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveMonotoneX);
  
  const area = d3.area()
    .x(d => xScale(d.x))
    .y0(height)
    .y1(d => yScale(d.y))
    .curve(d3.curveMonotoneX);
  
  svg.append('path')
    .datum(data)
    .attr('fill', color)
    .attr('fill-opacity', 0.2)
    .attr('d', area);
  
  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 2)
    .attr('d', line);
}