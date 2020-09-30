import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {format} from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';

import api from '../../services/api';

import {sortTransactions} from '../../utils/sort';

import {
  Header,
  HeaderBackground,
  LogoAndDate,
  DateText,
  FakeStatusBar,
} from './styles';
import Logo from '../../assets/logo.svg';
import {Balance, Transaction} from '../../services/interfaces';

import DashboardList from '../../components/DashboardList';
import TransactionList from '../../components/TransactionList';

const List: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({
    total: 0,
    outcome: 0,
    income: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const {data} = await api.get('/transactions');

      setBalance(data.balance);
      setTransactions(sortTransactions(data.transactions));
      console.log(transactions);
    }

    fetchData();
  }, []);

  const today = new Date();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderBackground />
        <LogoAndDate>
          <Logo />
          <DateText>
            {format(today, "dd 'de' MMMM", {locale: brLocale})}
          </DateText>
        </LogoAndDate>
      </Header>

      <DashboardList
        balance={balance}
        transactions={transactions}
        today={today}
      />

      <TransactionList transactions={transactions} />

      <FakeStatusBar />
    </>
  );
};

export default List;
