export const animations = {
  // Fade in animation
  fadeIn(selection, duration = 750, delay = 0) {
    selection
      .style('opacity', 0)
      .transition()
      .duration(duration)
      .delay(delay)
      .style('opacity', 1);
  },
  
  // Slide in from left
  slideInLeft(selection, duration = 750, delay = 0) {
    selection
      .attr('transform', 'translate(-50, 0)')
      .style('opacity', 0)
      .transition()
      .duration(duration)
      .delay(delay)
      .attr('transform', 'translate(0, 0)')
      .style('opacity', 1);
  },
  
  // Slide in from right
  slideInRight(selection, duration = 750, delay = 0) {
    selection
      .attr('transform', 'translate(50, 0)')
      .style('opacity', 0)
      .transition()
      .duration(duration)
      .delay(delay)
      .attr('transform', 'translate(0, 0)')
      .style('opacity', 1);
  },
  
  // Scale up animation
  scaleUp(selection, duration = 750, delay = 0) {
    selection
      .attr('transform', 'scale(0)')
      .transition()
      .duration(duration)
      .delay(delay)
      .attr('transform', 'scale(1)');
  },
  
  // Staggered animation for multiple elements
  stagger(selection, animationFn, baseDelay = 0, staggerDelay = 50) {
    selection.each(function(d, i) {
      animationFn(d3.select(this), 750, baseDelay + (i * staggerDelay));
    });
  },
  
  // Pulse animation
  pulse(selection, duration = 1000) {
    function repeat() {
      selection
        .transition()
        .duration(duration)
        .attr('r', d => d.r * 1.2)
        .transition()
        .duration(duration)
        .attr('r', d => d.r)
        .on('end', repeat);
    }
    repeat();
  },
  
  // Path draw animation
  drawPath(selection, duration = 1500) {
    const length = selection.node().getTotalLength();
    
    selection
      .attr('stroke-dasharray', length + ' ' + length)
      .attr('stroke-dashoffset', length)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);
  }
};