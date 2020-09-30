import React from 'react';
import {ListRenderItem} from 'react-native';
import {Balance, BalanceItem, Transaction} from '../../services/interfaces';
import {format} from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';

import {
  BalanceList,
  BalanceItemContainer,
  HeaderBalanceItem,
  HeaderBalanceTitle,
  BalanceValue,
  BalanceSubTitle,
  Container,
} from './styles';

import TotalLogo from '../../assets/total_white.svg';
import OutcomeLogo from '../../assets/outcome.svg';
import IncomeLogo from '../../assets/income.svg';

interface DashboardProps {
  balance: Balance;
  transactions: Transaction[];
  today: Date;
}

const DashboardList: React.FC<DashboardProps> = ({
  balance,
  transactions,
  today,
}) => {
  const extractArrayFromBalance = () => {
    return Object.keys(balance)
      .map(
        (key): BalanceItem => {
          const parsedKey = key as 'total' | 'income' | 'outcome';

          return {
            type: parsedKey,
            value: balance[parsedKey],
          };
        },
      )
      .sort((a, b) => {
        if (a.type > b.type) {
          return 1;
        }
        if (a.type < b.type) {
          return -1;
        }
        return 0;
      });
  };

  const getLastEntryFromTransactions = (type: string): Transaction => {
    return transactions.filter((transaction) => transaction.type === type)[0];
  };

  const balanceTypeDict: {[key in 'total' | 'income' | 'outcome']: string} = {
    total: 'Total',
    income: 'Entradas',
    outcome: 'Saídas',
  };

  const arrayData: BalanceItem[] = extractArrayFromBalance();

  const icons: {[key in 'total' | 'income' | 'outcome']: any} = {
    total: TotalLogo,
    income: IncomeLogo,
    outcome: OutcomeLogo,
  };

  const renderItem: ListRenderItem<BalanceItem> = ({item, index}) => {
    const isTotal = item.type === 'total';
    const Icon = icons[item.type];
    const textType = balanceTypeDict[item.type];
    let subtitle;
    if (item.type === 'total') {
      subtitle = `Visualizando transações até ${format(today, "dd 'de' MMMM", {
        locale: brLocale,
      })}`;
    } else {
      const lastEntry = getLastEntryFromTransactions(item.type);

      if (lastEntry) {
        const createdAtDate = new Date(lastEntry.created_at);
        subtitle = `Última ${textType
          .toLowerCase()
          .substring(0, textType.length - 1)} dia ${format(
          createdAtDate,
          "dd 'de' MMMM",
          {locale: brLocale},
        )}`;
      }
    }
    return (
      <BalanceItemContainer
        isLast={index === arrayData.length - 1}
        isTotal={isTotal}>
        <HeaderBalanceItem>
          <HeaderBalanceTitle isTotal={isTotal}>{textType}</HeaderBalanceTitle>
          <Icon width={40} />
        </HeaderBalanceItem>

        <BalanceValue isTotal={isTotal}>
          R$&nbsp;
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.value)}
        </BalanceValue>
        <BalanceSubTitle isTotal={isTotal}>{subtitle}</BalanceSubTitle>
      </BalanceItemContainer>
    );
  };

  return (
    <Container>
      <BalanceList
        data={arrayData}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.type}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default DashboardList;
