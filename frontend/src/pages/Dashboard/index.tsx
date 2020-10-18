import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiPieChart, FiList } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';
import DashboardTableView from './DashboardTableView';
import DashboardGraphView from './DashboardGraphView';

import formatValue from '../../utils/formatValue';

import {
  Transaction,
  Balance,
  Pagination,
  PaginationChange,
  Sort,
} from '../../services/interfaces';

import { Container, CardContainer, Card, TitleAndViewSelector } from './styles';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [sortData, setSortData] = useState<Sort>(() => {
    return {
      sort: 'created_at',
      direction: 'DESC',
    };
  });

  const [view, setView] = useState('table');

  const [pagination, setPagination] = useState<Pagination>(() => {
    return {
      page: 1,
      pageSize: 5,
      total: 0,
    };
  });

  const reloadTransactions = useCallback(() => {
    async function loadTransactions(
      { sort, direction }: Sort,
      { page, pageSize }: Omit<Pagination, 'total'>,
    ): Promise<void> {
      const { data } = await api.get('/transactions', {
        params: {
          sort,
          direction,
          page,
          pageSize,
        },
      });

      setTransactions(data.transactions);
      setBalance(data.balance);
      setPagination(oldPagination => ({
        ...oldPagination,
        total: data.pageCount,
      }));
    }

    loadTransactions(sortData, {
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
  }, [sortData, pagination.page, pagination.pageSize]);

  useEffect(() => {
    reloadTransactions();
  }, [reloadTransactions]);

  const handlePaginate = useCallback((selectedItem: PaginationChange) => {
    setPagination(oldPagination => ({
      ...oldPagination,
      page: selectedItem.selected + 1,
    }));
  }, []);

  const handleSort = useCallback((sort: string, direction: string) => {
    setSortData({ sort, direction });
    setPagination(oldPagination => ({ ...oldPagination, page: 1 }));
  }, []);

  const handleDelete = useCallback(
    async (transactionToDelete: Transaction): Promise<void> => {
      await api.delete(`/transactions/${transactionToDelete.id}`);

      toast.success('Transação apagada com sucesso!');
      reloadTransactions();
    },
    [reloadTransactions],
  );

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
          <DashboardTableView
            transactions={transactions}
            pagination={pagination}
            sort={sortData}
            handlePaginate={handlePaginate}
            handleSort={handleSort}
            handleDelete={handleDelete}
          />
        )}

        {view === 'graph' && <DashboardGraphView />}
      </Container>
    </>
  );
};

export default Dashboard;
