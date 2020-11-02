import React from 'react';

import Header from '../../components/Header';

import { Container, TableContainer, TableBodyColumn, Title } from './styles';

const Config: React.FC = () => {
  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Configurações</Title>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Ícone</th>
                <th>Cor Dark</th>
                <th>Cor Light</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableBodyColumn />
                <TableBodyColumn />
                <TableBodyColumn />
                <TableBodyColumn />
              </tr>
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Config;
