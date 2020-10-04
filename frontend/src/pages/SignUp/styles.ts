import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #5636d3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  width: 500px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    margin: 50px 0;
  }

  > a {
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.15, '#FFF')};
    }
  }
`;
