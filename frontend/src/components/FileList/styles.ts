import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  button {
    border: 0;
    background: transparent;
    color: #e83f5b;
    margin-left: 5px;
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }

    svg {
      transition: color 0.2s;
      &:hover {
        cursor: pointer;
        color: #e83f5b;
      }
    }
  }
`;
