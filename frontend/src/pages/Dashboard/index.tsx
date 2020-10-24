import React, { useState, useEffect, useCallback } from 'react';
import { FiPieChart, FiList } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';
import DashboardTableView from './DashboardTableView';
import DashboardGraphView from './DashboardGraphView';

import formatValue from '../../utils/formatValue';

import { Balance } from '../../services/interfaces';

import { Container, CardContainer, Card, TitleAndViewSelector } from './styles';

const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [view, setView] = useState('table');

  const reloadBalance = useCallback(async () => {
    const { data } = await api.get('/transactions/balance');
    setBalance(data);
  }, []);

  useEffect(() => {
    reloadBalance();
  }, [reloadBalance]);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{formatValue(balance?.income)}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {formatValue(balance?.outcome)}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{formatValue(balance?.total)}</h1>
          </Card>
        </CardContainer>

        <TitleAndViewSelector>
          <h1>Dashboard</h1>

          <div>
            <FiList
              size={25}
              className={view === 'table' ? 'active' : undefined}
              onClick={() => setView('table')}
            />
            <FiPieChart
              size={25}
              className={view === 'graph' ? 'active' : undefined}
              onClick={() => setView('graph')}
            />
          </div>
        </TitleAndViewSelector>

        {view === 'table' && (
          <DashboardTableView onTransactionDeleted={() => reloadBalance()} />
        )}

        {view === 'graph' && <DashboardGraphView />}
      </Container>
    </>
  );
};

export default Dashboard;
