import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff872c;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);

    color: #312308;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff872c transparent;
      border-width: 6px 6px 0 6px;
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
      position: absolute;
    }
  }

  &:hover {
    span {
      opacity: 1;
      visibility: visible;
    }
  }
`;
