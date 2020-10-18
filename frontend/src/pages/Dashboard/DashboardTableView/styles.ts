import styled, { css } from 'styled-components';
import { rgba, tint, shade } from 'polished';
import Tooltip from '../../../components/Tooltip';

interface TableBodyColumnProps {
  categoryBackground?: string;
}

export const TableBodyColumn = styled.td<TableBodyColumnProps>`
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

  svg {
    transition: color 0.2s;
    &:hover {
      cursor: pointer;
      color: ${props => props.theme.colors.danger};
    }
  }

  ${props =>
    props.categoryBackground &&
    css`
      border-left-color: ${props.categoryBackground};
      color: ${props.categoryBackground};
    `}
`;

export const TableContainer = styled.section`
  margin-top: 10px;
  min-height: 455px;

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

      svg {
        vertical-align: middle;
        cursor: pointer;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;

export const PaginationContainer = styled.section`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  ul {
    display: flex;
    li {
      display: inline-block;
      height: 50px;
      transition: all 0.2s linear;

      &.previous_page,
      &.next_page {
        background: ${props => props.theme.colors.secondary};

        a {
          color: ${props => props.theme.colors.secondaryText};
        }
      }

      &.previous_page {
        border-radius: 5px 0 0 5px;
      }

      &.next_page {
        border-radius: 0 5px 5px 0;
      }

      &.active_page {
        background: ${props => props.theme.colors.secondary};

        a {
          color: ${props => props.theme.colors.secondaryText};
          border-top: 0;
          border-bottom: 0;
          border: 1px solid
            ${props => rgba(props.theme.colors.primaryText, 0.075)};
        }
      }

      a {
        cursor: pointer;
        color: ${props => props.theme.colors.primaryText};
        padding: 10px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      &:hover:not(.disabled) {
        background: ${props => tint(0.2, props.theme.colors.secondary)};
        a {
          color: ${props => props.theme.colors.secondaryText};
        }
      }

      &.disabled {
        background: ${props => shade(0.05, props.theme.colors.secondary)};

        a {
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const Delete = styled(Tooltip)`
  width: 20px;

  span {
    background: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors.dangerText};

    &::before {
      border-color: ${props => props.theme.colors.danger} transparent;
    }
  }
`;
