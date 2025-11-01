export const formatters = {
  // Formatear números con separadores de miles
  number(value, decimals = 0) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  },
  
  // Formatear como porcentaje
  percent(value, decimals = 2) {
    return `${(value * 100).toFixed(decimals)}%`;
  },
  
  // Formatear números grandes con sufijos
  compact(value) {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  },
  
  // Formatear decimales
  decimal(value, decimals = 4) {
    return value.toFixed(decimals);
  },
  
  // Formatear métricas de centralidad
  centrality(value) {
    return value.toFixed(4);
  },
  
  // Truncar texto con elipsis
  truncate(text, maxLength = 20) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  // Formatear ID de nodo
  nodeId(id) {
    return `Node ${id}`;
  }
};