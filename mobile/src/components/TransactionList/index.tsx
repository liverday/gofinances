import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {Transaction} from '../../services/interfaces';
import {format} from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';

import {
  Title,
  Container,
  ItemContainer,
  Separator,
  ItemTitle,
  ItemValue,
  CategoryAndDate,
  CategoryAndDateText,
} from './styles';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({transactions}) => {
  const renderItem: ListRenderItem<Transaction> = ({item}) => {
    return (
      <ItemContainer>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemValue type={item.type}>
          {item.type === 'outcome' ? '- ' : ''}
          R$&nbsp;
          {new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(item.value)}
        </ItemValue>

        <CategoryAndDate>
          <CategoryAndDateText>{item.category.title}</CategoryAndDateText>
          <CategoryAndDateText>
            {format(new Date(item.created_at), 'dd/MM/yyyy', {
              locale: brLocale,
            })}
          </CategoryAndDateText>
        </CategoryAndDate>
      </ItemContainer>
    );
  };

  return (
    <Container>
      <Title>Listagem</Title>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
};

export default TransactionList;
