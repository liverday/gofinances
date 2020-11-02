import styled from 'styled-components';

import Tooltip from '../../components/Tooltip';
import Button from '../../components/Button';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: ${props => props.theme.colors.primaryText};
  text-align: center;
`;

export const TableContainer = styled.section`
  margin-top: 20px;
  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${props => props.theme.colors.defaultText};
      font-weight: normal;
      padding: 20px 42px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      height: 30px;
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

export const TableBodyColumn = styled.td`
  padding: 20px 32px;
  border: 0;
  background: ${props => props.theme.colors.default};
  border-left-width: 8px;
  border-left-style: solid;
  border-left-color: ${props => props.theme.colors.default};
  font-size: 16px;
  font-weight: normal;
  color: ${props => props.theme.colors.defaultText};
  transition: border-left-width 0.2s ease-in;

  &.title {
    color: ${props => props.theme.colors.primaryText};
  }

  &.category {
    svg {
      vertical-align: sub;
      margin-right: 10px;
    }
  }

  &.income {
    color: ${props => props.theme.colors.success};
  }

  &.outcome {
    color: ${props => props.theme.colors.danger};
  }
`;

interface SquareProps {
  background: string;
}

export const Square = styled.div<SquareProps>`
  padding: 5px;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background-color: ${props => props.background};
`;

export const ColorInfoContainer = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
  }
`;

export const Delete = styled(Tooltip)`
  width: 20px;
  height: 20px;

  span {
    background: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors.dangerText};

    &::before {
      border-color: ${props => props.theme.colors.danger} transparent;
    }
  }

  svg {
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: ${props => props.theme.colors.danger};
    }
  }
`;

export const NewCategoryButton = styled(Button)`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 5px;
  margin-top: 0;

  svg {
    vertical-align: normal;
  }
`;
