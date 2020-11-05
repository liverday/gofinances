import styled from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

interface ColorSquareProps {
  color: string;
}

export const ColorSquare = styled.div<ColorSquareProps>`
  padding: 5px;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: ${props => props.color};
`;

export const BlockPickerCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

export const BlockPickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  margin-top: 20px;
  left: 0;
`;

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
  padding: 16px;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.defaultText};
  width: 100%;

  display: flex;
  align-items: center;

  position: relative;

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

  > ${ColorSquare} {
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
