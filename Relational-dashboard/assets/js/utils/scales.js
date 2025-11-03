export const scales = {
  // Crear escala lineal
  linear(domain, range) {
    return d3.scaleLinear()
      .domain(domain)
      .range(range);
  },
  
  // Crear escala de banda para gráficos de barras
  band(domain, range, padding = 0.1) {
    return d3.scaleBand()
      .domain(domain)
      .range(range)
      .padding(padding);
  },
  
  // Crear escala de colores
  color(domain, colors) {
    return d3.scaleOrdinal()
      .domain(domain)
      .range(colors);
  },
  
  // Crear escala de radio para nodos
  radius(domain, range = [3, 20]) {
    return d3.scaleSqrt()
      .domain(domain)
      .range(range);
  },
  
  // Escala de opacidad
  opacity(domain, range = [0.3, 1]) {
    return d3.scaleLinear()
      .domain(domain)
      .range(range);
  },
  
  // Normalizar valores entre 0 y 1
  normalize(values) {
    const min = d3.min(values);
    const max = d3.max(values);
    return values.map(v => (v - min) / (max - min));
  }
};