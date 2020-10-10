import styled, { css } from 'styled-components';
import { tint, rgba } from 'polished';

interface TypeInputProps {
  transactionType: 'income' | 'outcome';
  isActive?: boolean;
}

const typeInputVariation = {
  income: css`
    border-color: ${props => rgba(props.theme.colors.success, 0.1)};
    background: ${props => rgba(props.theme.colors.success, 0.1)};
  `,
  outcome: css`
    border-color: ${props => rgba(props.theme.colors.danger, 0.1)};
    background: ${props => rgba(props.theme.colors.danger, 0.1)};
  `,
};

export const TypeInput = styled.div<TypeInputProps>`
  flex: 1;
  color: ${props => props.theme.colors.primaryText};
  cursor: pointer;
  text-align: center;
  background: transparent;
  padding: 16px;
  border-radius: 5px;
  border: 1px solid ${props => tint(0.8, props.theme.colors.defaultText)};

  & + div {
    margin-left: 8px;
  }

  input {
    appearance: none;
  }

  span {
    vertical-align: middle;
  }

  img {
    vertical-align: middle;
    margin-left: 8px;
  }

  transition: background 0.2s ease-in;

  &:hover {
    ${props => typeInputVariation[props.transactionType]}
  }

  ${props => props.isActive && typeInputVariation[props.transactionType]}
`;

export const Container = styled.div`
  display: flex;
`;
