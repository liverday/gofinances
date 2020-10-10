import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 16px;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.defaultText};
  width: 100%;

  display: flex;
  align-items: center;

  ${props =>
    props.hasError &&
    css`
      border-color: ${props.theme.colors.danger};
    `}

  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      color: ${props.theme.colors.secondary};
    `}

  input {
    border: 0;
    flex: 1;
    background: transparent;
    color: ${props => props.theme.colors.primaryText};

    &::placeholder {
      color: ${props => props.theme.colors.defaultText};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  color: ${props => props.theme.colors.danger};

  svg {
    margin: 0;
  }

  span {
    background: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors.dangerText};

    &::before {
      border-color: ${props => props.theme.colors.danger} transparent;
    }
  }
`;
