import {GlobalText} from '../../../styles';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import {BalanceItem} from '../../services/interfaces';

export const BalanceList = styled(FlatList as new () => FlatList<BalanceItem>)`
  margin: 20px 20px 0 20px;
  height: 0px;
`;

export const HeaderBalanceTitle = styled(GlobalText)<{isTotal: boolean}>`
  color: ${(props) => (props.isTotal ? '#FFF' : '#363f5f')};
`;

export const HeaderBalanceItem = styled.View`
  flex-flow: row nowrap;
  justify-content: space-between;
  font-size: 14px;
`;

export const BalanceItemContainer = styled.View<{
  isTotal: boolean;
  isLast: boolean;
}>`
  width: 300px;
  background: ${(props) => (props.isTotal ? '#FF872C' : '#FFF')};
  height: 180px;
  margin-right: ${(props) => (props.isLast ? '0' : '20px')};
  border-radius: 5px;
  padding: 20px;
`;

export const BalanceValue = styled(GlobalText)<{isTotal: boolean}>`
  margin-top: 40px;
  color: ${(props) => (props.isTotal ? '#FFF' : '#363f5f')};
  font-size: 30px;
  font-weight: 500;
`;

export const BalanceSubTitle = styled(GlobalText)<{isTotal: boolean}>`
  color: ${(props) => (props.isTotal ? '#FFF' : '#969CB2')};
  font-size: 12px;
`;

export const Container = styled.View`
  height: 200px;
`;
