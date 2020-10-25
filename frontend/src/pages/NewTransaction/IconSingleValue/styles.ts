import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 3px 10px;
  align-items: center;

  span {
    margin-left: 10px;
  }

  color: ${props => props.theme.colors.primaryText};
`;
