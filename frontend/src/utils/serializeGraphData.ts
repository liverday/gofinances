import { format, addHours } from 'date-fns';
import { tint } from 'polished';
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
    labels: data.income.map((entry: any[]) =>
      format(addHours(new Date(entry[0]), 3), 'dd'),
    ),
    datasets: [
      {
        label: 'Entradas',
        fill: false,
        backgroundColor: theme.colors.success,
        borderColor: tint(0.1, theme.colors.success),
        borderJoinStyle: 'miter',
        data: data.income.map((entry: any[]) => entry[1]),
      },
      {
        label: 'Saídas',
        fill: false,
        borderColor: tint(0.1, theme.colors.danger),
        backgroundColor: theme.colors.danger,
        borderJoinStyle: 'miter',
        data: data.outcome.map((entry: any[]) => entry[1]),
      },
    ],
  };
}
