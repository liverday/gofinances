import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import * as Icons from 'react-icons/all';

import ReactPaginate from 'react-paginate';
import formatValue from '../../../utils/formatValue';
import { useTheme } from '../../../hooks/theme';

import api from '../../../services/api';

import {
  Pagination,
  PaginationChange,
  Sort,
  Transaction,
} from '../../../services/interfaces';

import {
  TableContainer,
  TableBodyColumn,
  Delete,
  PaginationContainer,
} from './styles';

interface DashboardTablewViewProps {
  onTransactionDeleted(): void;
}

const DashboardTableView: React.FC<DashboardTablewViewProps> = ({
  onTransactionDeleted,
}) => {
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
      onTransactionDeleted();
    },
    [reloadTransactions, onTransactionDeleted],
  );

  const sortIcon =
    sortData.direction === 'DESC' ? (
      <Icons.FiChevronDown
        size={20}
        onClick={() => handleSort('created_at', 'ASC')}
      />
    ) : (
      <Icons.FiChevronUp
        size={20}
        onClick={() => handleSort('created_at', 'DESC')}
      />
    );

  return (
    <>
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
                        <Icons.FiTrash
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
          previousLabel={<Icons.FiChevronLeft />}
          nextLabel={<Icons.FiChevronRight />}
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
    </>
  );
};

export default DashboardTableView;
