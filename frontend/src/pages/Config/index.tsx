import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/all';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Header from '../../components/Header';
import Modal from '../../components/Modal';

import api from '../../services/api';
import { Category } from '../../services/interfaces';
import { useTheme } from '../../hooks/theme';

import {
  Container,
  TableContainer,
  TableBodyColumn,
  Title,
  Square,
  ColorInfoContainer,
  Delete,
  NewCategoryButton,
} from './styles';
import FormAddCategory from './FormAddCategory';

const ReactSwal = withReactContent(Swal);

const Config: React.FC = () => {
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isShowingModal, setIsShowingModal] = useState<boolean>(true);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const { data } = await api.get('/categories');

      setCategories(data);
    }

    loadCategories();
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowingModal(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsShowingModal(true);
  }, []);

  const handleDelete = useCallback(
    async (categoryToDelete: Category) => {
      const { data, status } = await api.delete(
        `/categories/${categoryToDelete.id}`,
      );

      if (status === 200 && data.status === 'confirm') {
        const { value: isConfirmed } = await ReactSwal.fire({
          title: 'Aviso!',
          text: data.message,
          confirmButtonText: 'Sim',
          denyButtonText: 'Não',
          showDenyButton: true,
          confirmButtonColor: theme.colors.success,
          denyButtonColor: theme.colors.danger,
        });

        if (isConfirmed) {
          await api.delete(
            `/categories/${categoryToDelete.id}?isConfirmed=${isConfirmed}`,
          );

          const newCategories = categories.filter(
            category => category.id !== categoryToDelete.id,
          );

          setCategories([...newCategories]);
        }
      }
    },
    [theme, categories],
  );

  const handleSubmit = useCallback(async (data: any) => {
    console.log(data);
  }, []);

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
                <th>
                  <NewCategoryButton
                    type="button"
                    onClick={() => handleOpenModal()}
                  >
                    <Icons.FiPlus size={20} />
                  </NewCategoryButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {categories &&
                categories.map(category => {
                  const [, iconName] = category.icon.split('/');
                  const Icon = (Icons as any)[iconName];
                  return (
                    <tr key={category.id}>
                      <TableBodyColumn>{category.title}</TableBodyColumn>
                      <TableBodyColumn>
                        <Icon size={20} />
                      </TableBodyColumn>
                      <TableBodyColumn>
                        <ColorInfoContainer>
                          <Square background={category.background_color_dark} />
                          <span>{category.background_color_dark}</span>
                        </ColorInfoContainer>
                      </TableBodyColumn>
                      <TableBodyColumn>
                        <ColorInfoContainer>
                          <Square
                            background={category.background_color_light}
                          />
                          <span>{category.background_color_light}</span>
                        </ColorInfoContainer>
                      </TableBodyColumn>
                      <TableBodyColumn>
                        <Delete title="Apagar categoria">
                          <Icons.FiTrash
                            size={20}
                            onClick={() => handleDelete(category)}
                          />
                        </Delete>
                      </TableBodyColumn>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </TableContainer>

        <Modal show={isShowingModal} onClose={handleCloseModal}>
          <FormAddCategory
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Config;
