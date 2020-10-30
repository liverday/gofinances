import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  gap: 20px;
  margin-top: 40px;
  min-height: 455px;
`;

interface WidgetProps {
  borderLeftColor?: string;
}

export const Widget = styled.div<WidgetProps>`
  padding: 15px 20px;
  border-radius: 5px;
  border-left: 5px solid ${props => props.theme.colors.default};
  background-color: ${props => props.theme.colors.default};
  color: ${props => props.theme.colors.primaryText};

  ${props =>
    props.borderLeftColor &&
    css`
      border-left-color: ${props.borderLeftColor};
    `}

  > header {
    display: flex;
    justify-content: space-between;

    p {
      font-size: 16px;
      color: ${props => props.theme.colors.defaultText};
    }

    > div.flex {
      display: flex;
      flex-flow: row;

      span {
        padding-bottom: 3px;
        border-bottom: 2px solid transparent;
        width: 20px;
        text-align: center;
        transition: border-color 0.2s ease;

        & + span {
          margin-left: 10px;
        }

        &:hover,
        &.active {
          cursor: pointer;
          border-color: ${props => props.theme.colors.secondary};
        }
      }
    }
  }

  > div {
    margin-top: 20px;
  }

  h2 {
    font-size: 24px;
    font-weight: normal;
    margin-top: 15px;

    svg {
      vertical-align: middle;
    }

    > span {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
`;

export const OverviewGridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > ${Widget} {
    flex: 1;
    & + ${Widget} {
      margin-left: 20px;
    }
  }
`;

export const GraphGridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  column-gap: 20px;
`;
