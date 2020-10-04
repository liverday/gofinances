import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFilled: boolean;
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  border: 2px solid #fff;
  color: #969cb2;
  width: 100%;

  display: flex;
  align-items: center;

  ${props =>
    props.hasError &&
    css`
      border-color: #e83f5b;
    `}

  ${props =>
    (props.isFocused || props.isFilled) &&
    css`
      color: #ff872c;
    `}

  input {
    border: 0;
    flex: 1;
    background: transparent;
    color: #363f5f;

    &::placeholder {
      color: #969cb2;
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
  color: #e83f5b;

  svg {
    margin: 0;
  }

  span {
    background: #e83f5b;
    color: #fff;

    &::before {
      border-color: #e83f5b transparent;
    }
  }
`;
