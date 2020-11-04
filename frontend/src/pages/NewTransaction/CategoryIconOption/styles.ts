import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 3px 10px;
  align-items: center;

  span {
    margin-left: 10px;
  }

  transition: background 0.2s ease-in;
  color: ${props => props.theme.colors.primaryText};

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.background};
  }
`;
