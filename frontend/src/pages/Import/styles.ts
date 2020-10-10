import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
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

export const ImportFileContainer = styled.section`
  background: ${props => props.theme.colors.default};
  margin-top: 40px;
  border-radius: 5px;
  padding: 64px;
`;

export const Footer = styled.section`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 18px;
    color: ${props => props.theme.colors.defaultText};

    img {
      margin-right: 5px;
    }
  }

  button {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondaryText};
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${props => shade(0.2, props.theme.colors.secondary)};
    }
  }
`;
