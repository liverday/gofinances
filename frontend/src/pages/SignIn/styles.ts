import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.primary};
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
  color: ${props => props.theme.colors.secondaryText};

  form {
    width: 100%;
    margin: 50px 0;

    div + div {
      margin-top: 10px;
    }
  }

  > a {
    color: ${props => props.theme.colors.secondaryText};
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${props => shade(0.15, props.theme.colors.secondaryText)};
    }
  }
`;
