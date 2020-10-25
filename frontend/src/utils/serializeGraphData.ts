import { GraphData, Category } from '../services/interfaces';
import Theme from '../styles/themes/theme';

export default function serializeGraphData(
  theme: Theme,
  data: any,
  type: 'donut' | 'line',
): GraphData {
  if (type === 'donut') {
    return {
      labels: data.map((item: Category) => item.title),
      datasets: [
        {
          label: 'Transações por Categoria',
          ...data.reduce(
            (accumulator: any, current: Category) => {
              accumulator.data.push(current.transactionsCount);
              accumulator.backgroundColor.push(
                theme.title === 'dark'
                  ? current.background_color_light
                  : current.background_color_dark,
              );

              accumulator.borderColor.push(
                theme.title === 'dark'
                  ? current.background_color_dark
                  : current.background_color_light,
              );

              return accumulator;
            },
            {
              data: [],
              backgroundColor: [],
              borderColor: [],
            },
          ),
        },
      ],
    };
  }
  return {
    labels: [],
    datasets: [],
  };
}
