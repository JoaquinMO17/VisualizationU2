import { theme } from '../config/theme.js';

export class Tooltip {
  constructor() {
    this.tooltip = null;
    this.init();
  }
  
  init() {
    this.tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', theme.colors.card)
      .style('border', `1px solid ${theme.colors.border}`)
      .style('border-radius', `${theme.borderRadius.md}px`)
      .style('padding', `${theme.spacing.sm}px`)
      .style('font-size', `${theme.fontSize.sm}px`)
      .style('color', theme.colors.text.primary)
      .style('pointer-events', 'none')
      .style('z-index', '1000')
      .style('max-width', '200px');
  }
  
  show(content, event) {
    this.tooltip
      .html(content)
      .style('visibility', 'visible')
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`);
  }
  
  hide() {
    this.tooltip.style('visibility', 'hidden');
  }
  
  move(event) {
    this.tooltip
      .style('left', `${event.pageX + 10}px`)
      .style('top', `${event.pageY - 10}px`);
  }
}

export const tooltip = new Tooltip();