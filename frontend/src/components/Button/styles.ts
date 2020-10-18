import styled from 'styled-components';
import { tint } from 'polished';

export const Container = styled.button`
  background: ${props => props.theme.colors.secondary};
  height: 56px;
  border-radius: 10px;
  padding: 0 16px;
  color: ${props => props.theme.colors.secondaryText};
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${props => tint(0.15, props.theme.colors.secondary)};
  }

  &:disabled {
    background: ${props => tint(0.15, props.theme.colors.secondary)};
    cursor: not-allowed;
  }
`;
