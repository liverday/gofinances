import Theme from '../styles/themes/theme';

export default function getChartOptions(theme: Theme): any {
  return {
    legend: {
      labels: {
        fontColor: theme.colors.defaultText,
      },
    },
  };
}
