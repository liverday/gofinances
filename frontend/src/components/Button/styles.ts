import styled from 'styled-components';
import { tint } from 'polished';

export const Container = styled.button`
  background: #ff872c;
  height: 56px;
  border-radius: 10px;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${tint(0.15, '#FF872C')};
  }
`;
