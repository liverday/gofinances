import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FiTrash } from 'react-icons/fi';

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

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const { data } = await api.get('/transactions');

      setTransactions(data.transactions);
      setBalance(data.balance);
    }

    loadTransactions();
  }, []);

  const handleDelete = async (
    transactionToDelete: Transaction,
  ): Promise<void> => {
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
  };

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
                <th>Data</th>
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
      </Container>
    </>
  );
};

export default Dashboard;
