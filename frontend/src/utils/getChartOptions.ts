import Theme from '../styles/themes/theme';

export default function getChartOptions(
  theme: Theme,
  type: 'donut' | 'line',
): any {
  if (type === 'donut') {
    return {
      legend: {
        labels: {
          fontColor: theme.colors.primaryText,
          fontStyle: '500',
          fontFamily: "'Poppins', sans-serif",
        },
        position: 'left',
        align: 'center',
      },
    };
  }
  return {
    legend: {
      labels: {
        fontColor: theme.colors.primaryText,
        fontFamily: "'Poppins', sans-serif",
        fontStyle: '500',
      },
    },
  };
}
