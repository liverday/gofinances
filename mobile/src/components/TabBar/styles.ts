import {GlobalText} from '../../../styles';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-flow: row nowrap;
  background: #fff;
`;

export const TabBarItem = styled.TouchableOpacity`
  padding: 10px 20px;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

interface TabBarTextProps {
  isFocused: boolean;
}

export const TabBarText = styled(GlobalText)<TabBarTextProps>`
  text-align: center;
  margin-left: 10px;
  color: ${(props) => (props.isFocused ? '#FF872C' : '#363F5F')};
`;
