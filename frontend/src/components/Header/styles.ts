import styled from 'styled-components';
import { tint } from 'polished';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;

      nav {
        a {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s;
          padding-bottom: 10px;

          & + a {
            margin-left: 32px;
          }

          &.active-link {
            border-bottom: 2px solid #ff872c;
          }

          &:hover {
            opacity: 0.6;
          }
        }
      }

      > a {
        background: #ff872c;
        color: #fff;
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
          background: ${tint(0.15, '#ff872c')}
        }
      }
    }
  }
`;
