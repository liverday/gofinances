import {GlobalText} from '../../../styles';
import styled from 'styled-components/native';

export const HeaderBackground = styled.View`
  background: #5636d3;
  position: absolute;
  height: 267px;
  width: 100%;
`;

export const Header = styled.View`
  position: relative;
  padding-top: 20px;
`;

export const DateText = styled(GlobalText)`
  color: #fff;
  opacity: 0.6;
`;

export const LogoAndDate = styled.View`
  justify-content: space-between;
  flex-flow: row nowrap;
  padding: 20px;
  align-items: center;
`;

interface FakeStatusBarProps {
  scrolling?: boolean;
}

export const FakeStatusBar = styled.View<FakeStatusBarProps>`
  background: rgba(0, 0, 0, 0.1);
  height: 25px;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
`;
