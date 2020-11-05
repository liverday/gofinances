import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/all';
import { toast } from 'react-toastify';
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
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

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

  const handleCategoryAdded = useCallback(
    (categoryAdded: Category) => {
      setCategories([...categories, categoryAdded]);

      toast.success('Categoria adicionada com sucesso!');

      handleCloseModal();
    },
    [categories, handleCloseModal],
  );

  const filterAndSetCategories = useCallback(
    (categoryToDelete: Category) => {
      const newCategories = categories.filter(
        category => category.id !== categoryToDelete.id,
      );

      setCategories([...newCategories]);
    },
    [categories],
  );

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
          background: theme.colors.background,
          customClass: {
            title: 'themed-swal-text',
            content: 'themed-swal-text',
          },
        });

        if (isConfirmed) {
          await api.delete(
            `/categories/${categoryToDelete.id}?isConfirmed=${isConfirmed}`,
          );

          filterAndSetCategories(categoryToDelete);
          toast.success('Categoria deletada com sucesso!');
        }
      } else {
        filterAndSetCategories(categoryToDelete);
        toast.success('Categoria deletada com sucesso!');
      }
    },
    [theme, filterAndSetCategories],
  );

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

        <Modal show={isShowingModal} onClose={handleCloseModal} height={650}>
          <FormAddCategory
            onSubmitted={handleCategoryAdded}
            onCancel={handleCloseModal}
          />
        </Modal>
      </Container>
    </>
  );
};

export default Config;
