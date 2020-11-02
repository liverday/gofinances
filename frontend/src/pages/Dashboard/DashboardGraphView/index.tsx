/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/all';
import { Line, Doughnut } from 'react-chartjs-2';

import api from '../../../services/api';

import { useTheme } from '../../../hooks/theme';
import formatValue from '../../../utils/formatValue';
import getChartOptions from '../../../utils/getChartOptions';
import serializeGraphData from '../../../utils/serializeGraphData';

import {
  Container,
  Widget,
  OverviewGridContainer,
  GraphGridContainer,
} from './styles';

import { Category, GraphData } from '../../../services/interfaces';

interface OverviewData {
  income: string;
  outcome: string;
  category?: Category;
}

interface LineGraphFilter {
  period: string;
}

const DashboardGraphView: React.FC = () => {
  const [donutData, setDonutData] = useState<GraphData>(() => {
    return {
      labels: [],
      datasets: [],
    };
  });
  const [lineData, setLineData] = useState<GraphData>(() => {
    return {
      labels: [],
      datasets: [],
    };
  });

  const [overviewData, setOverviewData] = useState<OverviewData>(() => {
    return {
      income: '0',
      outcome: '0',
      category: undefined,
    };
  });

  const [lineFilters, setLineFilters] = useState<LineGraphFilter>({
    period: 'week',
  });

  const { theme } = useTheme();

  useEffect(() => {
    async function loadData(): Promise<void> {
      const promises = Promise.all([
        api.get('/transactions/overview-data'),
        api.get('/transactions/count-by-category'),
        api.get(`/transactions/balance-graph?period=${lineFilters.period}`),
      ]);

      const [overview, donut, line] = await promises;
      const donutSerializedData = serializeGraphData(
        theme,
        donut.data,
        'donut',
      );

      const lineSerializedData = serializeGraphData(theme, line.data, 'line');

      setDonutData(donutSerializedData);
      setLineData(lineSerializedData);
      setOverviewData(overview.data);
    }

    loadData();
  }, [theme, lineFilters.period]);

  let CategoryIcon: any;

  if (overviewData.category) {
    const [, iconName] = overviewData.category.icon.split('/');
    CategoryIcon = (Icons as any)[iconName];
  }

  const handleLineFilters = useCallback(
    (period: string) => {
      const newLineFilters = {
        ...lineFilters,
        period,
      };

      setLineFilters(newLineFilters);
    },
    [lineFilters],
  );

  return (
    <Container>
      <OverviewGridContainer>
        <Widget borderLeftColor={theme.colors.success}>
          <header>
            <p>Maior entrada</p>
          </header>
          <h2>{formatValue(parseFloat(overviewData.income))}</h2>
        </Widget>
        <Widget borderLeftColor={theme.colors.danger}>
          <header>
            <p>Maior saida</p>
          </header>
          <h2>{formatValue(parseFloat(overviewData.outcome))}</h2>
        </Widget>
        <Widget borderLeftColor={theme.colors.secondary}>
          <header>
            <p>Categ. mais frequente</p>
          </header>
          {overviewData.category && (
            <h2>
              <CategoryIcon
                color={
                  theme.title === 'dark'
                    ? overviewData.category.background_color_dark
                    : overviewData.category.background_color_light
                }
              />
              <span>{overviewData.category.title}</span>
            </h2>
          )}
        </Widget>
      </OverviewGridContainer>
      <GraphGridContainer>
        <Widget>
          <header>
            <p>Entrada / Saída</p>

            <div className="flex">
              <span
                className={lineFilters.period === 'week' ? 'active' : undefined}
                onClick={() => handleLineFilters('week')}
              >
                S
              </span>
              <span
                className={
                  lineFilters.period === 'month' ? 'active' : undefined
                }
                onClick={() => handleLineFilters('month')}
              >
                M
              </span>
            </div>
          </header>

          <div>
            <Line data={lineData} options={getChartOptions(theme, 'line')} />
          </div>
        </Widget>
        <Widget>
          <header>
            <p>Transações por categoria</p>
          </header>
          <div>
            <Doughnut
              data={donutData}
              options={getChartOptions(theme, 'donut')}
            />
          </div>
        </Widget>
      </GraphGridContainer>
    </Container>
  );
};

export default DashboardGraphView;
