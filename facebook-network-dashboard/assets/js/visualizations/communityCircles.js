import { theme } from '../config/theme.js';
import { tooltip } from '../interactions/tooltips.js';
import { formatters } from '../utils/formatters.js';

export function renderCommunityCircles(data) {
  const container = d3.select('#community-circles');
  container.html('');
  
  const width = container.node().offsetWidth;
  const height = 400;
  
  const svg = container.append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Create hierarchy
  const root = d3.hierarchy({ children: data.communities })
    .sum(d => d.size);
  
  // Create pack layout
  const pack = d3.pack()
    .size([width - 20, height - 20])
    .padding(3);
  
  pack(root);
  
  // Create groups
  const node = svg.append('g')
    .attr('transform', 'translate(10, 10)')
    .selectAll('g')
    .data(root.leaves())
    .join('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`);
  
  // Add circles
  node.append('circle')
    .attr('class', 'community-circle')
    .attr('r', d => d.r)
    .style('fill', (d, i) => theme.colors.communities[i % theme.colors.communities.length])
    .on('mouseover', function(event, d) {
      d3.select(this).style('opacity', 0.8);
      
      const content = `
        <strong>Community ${d.data.id}</strong><br/>
        Nodes: ${formatters.number(d.data.size)}<br/>
        Top Nodes: ${d.data.topNodes.join(', ')}
      `;
      tooltip.show(content, event);
    })
    .on('mousemove', (event) => tooltip.move(event))
    .on('mouseout', function() {
      d3.select(this).style('opacity', 1);
      tooltip.hide();
    });
  
  // Add labels for larger circles
  node.filter(d => d.r > 30)
    .append('text')
    .attr('class', 'community-label')
    .attr('dy', '-0.5em')
    .text(d => `C${d.data.id}`)
    .style('font-size', `${theme.fontSize.sm}px`)
    .style('fill', theme.colors.text.primary);
  
  node.filter(d => d.r > 30)
    .append('text')
    .attr('class', 'community-count')
    .attr('dy', '1em')
    .text(d => formatters.number(d.data.size))
    .style('font-size', `${theme.fontSize.xs}px`)
    .style('fill', theme.colors.text.secondary);
}