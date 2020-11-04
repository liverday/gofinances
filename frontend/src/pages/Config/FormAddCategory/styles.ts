import styled from 'styled-components';
import { rgba, tint, shade } from 'polished';

import Button from '../../../components/Button';

export const Container = styled.div`
  padding: 20px;
  height: 100%;

  form {
    display: flex;
    flex-flow: column nowrap;
    height: 100%;
  }
`;

export const Header = styled.div`
  padding-bottom: 20px;
  border-bottom: 2px solid
    ${props =>
      props.theme.title === 'dark'
        ? rgba(props.theme.colors.background, 0.25)
        : rgba(props.theme.colors.background, 0.4)};

  h1 {
    font-weight: 500;
    font-size: 24px;
    color: ${props => props.theme.colors.primaryText};
  }
`;

export const Body = styled.div`
  flex: 1;
  padding: 20px 0;

  .form-group {
    background: ${props =>
      props.theme.title === 'light'
        ? tint(0.8, props.theme.colors.defaultText)
        : shade(0.25, props.theme.colors.default)};
    border-color: ${props =>
      props.theme.title === 'light'
        ? tint(0.8, props.theme.colors.defaultText)
        : shade(0.25, props.theme.colors.default)};
  }

  > div + div {
    margin-top: 10px;
  }
`;

export const Footer = styled.div`
  padding-top: 20px;
  border-top: 2px solid
    ${props =>
      props.theme.title === 'dark'
        ? rgba(props.theme.colors.background, 0.25)
        : rgba(props.theme.colors.background, 0.4)};
  display: flex;
  justify-content: flex-end;

  button {
    margin-top: 0;
    width: 120px;
    height: 48px;
  }

  button + button {
    margin-left: 10px;
  }
`;

export const CancelButton = styled(Button)`
  background-color: ${props =>
    props.theme.title === 'dark'
      ? props.theme.colors.background
      : shade(0.2, props.theme.colors.background)};

  &:hover {
    background-color: ${props =>
      props.theme.title === 'dark'
        ? tint(0.05, props.theme.colors.background)
        : shade(0.25, props.theme.colors.background)};
  }

  &:disabled {
    background: ${props =>
      props.theme.title === 'dark'
        ? tint(0.025, props.theme.colors.background)
        : shade(0.12, props.theme.colors.background)};
  }
`;
