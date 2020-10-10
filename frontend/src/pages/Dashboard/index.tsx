import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import {
  FiTrash,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  Delete,
  PaginationContainer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

interface Sort {
  sort: string;
  direction: string;
}

interface PaginationChange {
  selected: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [sortData, setSortData] = useState<Sort>(() => {
    return {
      sort: 'created_at',
      direction: 'DESC',
    };
  });

  const [pagination, setPagination] = useState<Pagination>(() => {
    return {
      page: 1,
      pageSize: 6,
      total: 0,
    };
  });

  useEffect(() => {
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

  const handleDelete = useCallback(
    async (transactionToDelete: Transaction): Promise<void> => {
      await api.delete(`/transactions/${transactionToDelete.id}`);

      const filteredTransactions = transactions.filter(
        transaction => transaction.id !== transactionToDelete.id,
      );
      setTransactions(filteredTransactions);

      const newValue =
        balance[transactionToDelete.type] - transactionToDelete.value;

      const newBalance = {
        ...balance,
        [transactionToDelete.type]: newValue,
      };

      newBalance.total = newBalance.income - newBalance.outcome;

      setBalance(newBalance);
      toast.success('Transação apagada com sucesso!');
    },
    [balance, transactions],
  );

  const handleSort = useCallback((sort: string, direction: string) => {
    setSortData({ sort, direction });
    setPagination(oldPagination => ({ ...oldPagination, page: 1 }));
  }, []);

  const handlePaginate = useCallback((selectedItem: PaginationChange) => {
    setPagination(oldPagination => ({
      ...oldPagination,
      page: selectedItem.selected + 1,
    }));
  }, []);

  const sortIcon =
    sortData.direction === 'DESC' ? (
      <FiChevronDown
        size={20}
        onClick={() => handleSort('created_at', 'ASC')}
      />
    ) : (
      <FiChevronUp size={20} onClick={() => handleSort('created_at', 'DESC')} />
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

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data {sortIcon}</th>
                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody>
              {transactions &&
                transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {formatValue(transaction.value)}
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>
                      {format(new Date(transaction.created_at), 'dd/MM/yyyy')}
                    </td>
                    <td>
                      <Delete title="Apagar transação">
                        <FiTrash
                          size={20}
                          onClick={() => handleDelete(transaction)}
                        />
                      </Delete>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableContainer>
        <PaginationContainer className="pagination">
          <ReactPaginate
            previousLabel={<FiChevronLeft />}
            nextLabel={<FiChevronRight />}
            pageCount={pagination.total}
            onPageChange={handlePaginate}
            forcePage={pagination.page - 1}
            disableInitialCallback
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            containerClassName="pagination"
            activeClassName="active_page"
            nextClassName="next_page"
            previousClassName="previous_page"
          />
        </PaginationContainer>
      </Container>
    </>
  );
};

export default Dashboard;
