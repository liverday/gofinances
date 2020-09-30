import styled from 'styled-components/native';
import {GlobalText} from '../../../styles';

export const Title = styled(GlobalText)`
  color: #363f5f;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

export const ItemContainer = styled.View`
  padding: 20px;
  background: #fff;
  border-radius: 5px;
`;

export const ItemTitle = styled(GlobalText)`
  color: #363f5f;
  font-size: 14px;
`;

export const ItemValue = styled(GlobalText)<{type: string}>`
  font-size: 20px;
  color: ${(props) => (props.type === 'outcome' ? '#E83F5B' : '#12A454')};
`;

export const CategoryAndDate = styled.View`
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 20px;
`;

export const CategoryAndDateText = styled(GlobalText)`
  font-size: 14px;
  color: #969cb2;
`;

export const Separator = styled.View`
  margin: 5px;
`;
