import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import {
  FiTrash,
  FiChevronUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import * as Icons from 'react-icons/all';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  Delete,
  PaginationContainer,
  TableBodyColumn,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: {
    title: string;
    icon: string;
    background_color_light: string;
    background_color_dark: string;
  };
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
  const { theme } = useTheme();
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
      pageSize: 5,
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

  const handlePaginate = useCallback((selectedItem: PaginationChange) => {
    setPagination(oldPagination => ({
      ...oldPagination,
      page: selectedItem.selected + 1,
    }));
  }, []);

  const handleDelete = useCallback(
    async (transactionToDelete: Transaction): Promise<void> => {
      await api.delete(`/transactions/${transactionToDelete.id}`);

      toast.success('Transação apagada com sucesso!');
      handlePaginate({
        selected: 0,
      });
    },
    [handlePaginate],
  );

  const handleSort = useCallback((sort: string, direction: string) => {
    setSortData({ sort, direction });
    setPagination(oldPagination => ({ ...oldPagination, page: 1 }));
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
                transactions.map(transaction => {
                  const [, iconName] = transaction.category.icon.split('/');
                  const CategoryIcon = (Icons as any)[iconName];
                  const categoryBackgroundKey = `background_color_${theme.title}`;
                  const categoryBackground =
                    transaction.category[
                      categoryBackgroundKey as
                        | 'background_color_light'
                        | 'background_color_dark'
                    ];
                  return (
                    <tr key={transaction.id}>
                      <TableBodyColumn
                        categoryBackground={categoryBackground}
                        className="title"
                      >
                        {transaction.title}
                      </TableBodyColumn>
                      <TableBodyColumn className={transaction.type}>
                        {formatValue(transaction.value)}
                      </TableBodyColumn>
                      <TableBodyColumn className="category">
                        <CategoryIcon size={20} color={categoryBackground} />
                        {transaction.category.title}
                      </TableBodyColumn>
                      <TableBodyColumn>
                        {format(new Date(transaction.created_at), 'dd/MM/yyyy')}
                      </TableBodyColumn>
                      <TableBodyColumn>
                        <Delete title="Apagar transação">
                          <FiTrash
                            size={20}
                            onClick={() => handleDelete(transaction)}
                          />
                        </Delete>
                      </TableBodyColumn>
                    </tr>
                  );
                })}
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
