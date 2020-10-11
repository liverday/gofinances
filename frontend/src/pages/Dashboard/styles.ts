import styled, { ThemeProps } from 'styled-components';
import { rgba, tint, shade } from 'polished';
import Tooltip from '../../components/Tooltip';
import Theme from '../../styles/themes/theme';

interface CardProps extends ThemeProps<Theme> {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.colors.primaryText};
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div`
  background: ${({ total, theme }: CardProps): string =>
    total ? theme.colors.secondary : theme.colors.default};
  padding: 22px 32px;
  border-radius: 5px;
  color: ${({ total, theme }: CardProps): string =>
    total ? theme.colors.secondaryText : theme.colors.primaryText};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }

  transition: transform 0.2s ease-in;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;
  min-height: 455px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${props => props.theme.colors.defaultText};
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      height: 30px;

      svg {
        vertical-align: middle;
        cursor: pointer;
      }
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: ${props => props.theme.colors.default};
      font-size: 16px;
      font-weight: normal;
      color: ${props => props.theme.colors.defaultText};

      &.title {
        color: ${props => props.theme.colors.primaryText};
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
