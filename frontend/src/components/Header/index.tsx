import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { shade } from 'polished';

import ReactSwitch from 'react-switch';

import { useTheme } from '../../hooks/theme';

import { Container } from './styles';

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
          </nav>

          <ReactSwitch
            onChange={() => toggleTheme()}
            checked={theme.title === 'dark'}
            className="theme-switcher"
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor={shade(0.15, theme.colors.primary)}
            onColor={theme.colors.secondary}
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
