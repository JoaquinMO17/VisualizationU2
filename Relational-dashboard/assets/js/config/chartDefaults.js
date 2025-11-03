import { theme } from './theme.js';

export const chartDefaults = {
  margin: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 60
  },
  
  marginLarge: {
    top: 40,
    right: 40,
    bottom: 60,
    left: 80
  },
  
  marginSmall: {
    top: 10,
    right: 10,
    bottom: 20,
    left: 40
  },
  
  axis: {
    stroke: theme.colors.border,
    strokeWidth: 1,
    fontSize: theme.fontSize.sm,
    fontFamily: 'Inter, sans-serif',
    color: theme.colors.text.secondary
  },
  
  grid: {
    stroke: theme.colors.border,
    strokeWidth: 0.5,
    strokeDasharray: '2,2',
    opacity: 0.5
  },
  
  tooltip: {
    background: theme.colors.card,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.primary,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
  },
  
  animation: {
    duration: 750,
    delay: 50,
    ease: 'cubic-in-out'
  }
};