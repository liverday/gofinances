import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
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
        <Link to="/">
          <FiArrowLeft size={20} /> Sair
        </Link>
      </div>
    </header>
  </Container>
);

export default Header;
