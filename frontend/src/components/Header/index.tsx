/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { shade } from 'polished';

import ReactSwitch from 'react-switch';

import { useTheme } from '../../hooks/theme';

import { Container, IconSwitcherContainer } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <div>
          <nav>
            <NavLink activeClassName="active-link" to="/dashboard">
              Listagem
            </NavLink>
            <NavLink activeClassName="active-link" to="/new-transaction">
              Nova transação
            </NavLink>
            <NavLink activeClassName="active-link" to="/import">
              Importar
            </NavLink>
            <NavLink activeClassName="active-link" to="/config">
              Configurações
            </NavLink>
          </nav>

          <ReactSwitch
            onChange={() => toggleTheme()}
            checked={theme.title === 'dark'}
            className="theme-switcher"
            checkedIcon={
              <IconSwitcherContainer>
                <FiMoon color={theme.colors.defaultText} />
              </IconSwitcherContainer>
            }
            uncheckedIcon={
              <IconSwitcherContainer align="flex-end">
                <FiSun color={theme.colors.secondary} />
              </IconSwitcherContainer>
            }
            height={20}
            width={50}
            handleDiameter={20}
            offColor={shade(0.15, theme.colors.primary)}
            onColor={shade(0.2, theme.colors.primary)}
          />

          <Link to="/">
            <FiArrowLeft size={20} /> Sair
          </Link>
        </div>
      </header>
    </Container>
  );
};

export default Header;
