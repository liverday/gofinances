import styled, { css } from 'styled-components';
import { tint } from 'polished';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.primary};
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;

      nav {
        a {
          color: ${props => props.theme.colors.secondaryText};
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s;
          padding-bottom: 10px;

          & + a {
            margin-left: 32px;
          }

          &.active-link {
            border-bottom: 2px solid ${props => props.theme.colors.secondary};
          }

          &:hover {
            opacity: 0.6;
          }
        }
      }

      .theme-switcher {
        margin-left: 20px;
      }

      > a {
        background: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondaryText};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 5px;
        width: 80px;
        text-decoration: none;
        margin-left: 30px;
        transition: background 0.2s;

        svg {
          margin-right: 10px;
        }

        &:hover {
          background: ${props => tint(0.15, props.theme.colors.secondary)};
        }
      }
    }
  }
`;

interface IconSwitcherContainerProps {
  align?: string;
}

export const IconSwitcherContainer = styled.div<IconSwitcherContainerProps>`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 5px;

  ${({ align }) =>
    align &&
    css`
      justify-content: ${align};
    `}
`;
