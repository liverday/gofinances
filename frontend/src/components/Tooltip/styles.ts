import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: ${props => props.theme.colors.secondary};
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

    color: ${props => props.theme.colors.secondaryText};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${props => props.theme.colors.secondary} transparent;
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
