import styled from 'styled-components';
import { tint, shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 700px;
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

export const NewTransactonContainer = styled.section`
  background: ${props => props.theme.colors.default};
  margin-top: 40px;
  border-radius: 5px;
  padding: 32px;

  form {
    .form-group {
      background: ${props =>
        props.theme.title === 'light'
          ? tint(0.95, props.theme.colors.defaultText)
          : shade(0.25, props.theme.colors.default)};
      border-color: ${props =>
        props.theme.title === 'light'
          ? tint(0.95, props.theme.colors.defaultText)
          : shade(0.25, props.theme.colors.default)};
    }

    > div + div {
      margin-top: 10px;
    }

    button {
      > div {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

export const Footer = styled.div`
  text-align: right;
  button {
    margin-top: 0;
    width: 200px;
  }
`;
