import styled, { ThemeProps } from 'styled-components';
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

export const TitleAndViewSelector = styled.section`
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    color: ${props => props.theme.colors.primaryText};
  }

  > div {
    display: flex;
    height: 100%;

    svg {
      padding-bottom: 5px;
      border-bottom: 2px solid transparent;
      color: ${props => props.theme.colors.defaultText};

      & + svg {
        margin-left: 5px;
      }

      transition: border-bottom 0.2s ease;

      &:hover,
      &.active {
        border-color: ${props => props.theme.colors.secondary};
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
`;
