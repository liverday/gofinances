import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as IconsFi from 'react-icons/fi';
import * as IconsFa from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import ReactLoading from 'react-loading';
import { CSSProperties } from 'styled-components';

import { useTheme } from '../../../hooks/theme';
import getValidationErrors from '../../../utils/getValidationErrors';
import { getCustomSelectOptionsModal } from '../../../utils/getCustomSelectOptions';

import { Container, Header, Footer, CancelButton, Body } from './styles';

import Button from '../../../components/Button';
import ColorPicker from '../../../components/ColorPicker';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import CategoryIconOptionConfig from '../CategoryIconOptionConfig';

interface FormAddCategoryProps {
  onSubmitted(): void;
  onCancel(): void;
}

const FormAddCategory: React.FC<FormAddCategoryProps> = ({
  onSubmitted,
  onCancel,
}) => {
  const { theme } = useTheme();
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Icons = {
    ...(IconsFi as any),
    ...(IconsFa as any),
  };
  const icons = Object.keys(Icons as any).map(id => {
    return {
      id,
      Component: (Icons as any)[id],
    };
  });

  const loadCategoryOptions = useCallback(
    (inputValue: string, callback: Function) => {
      setTimeout(
        () =>
          callback(
            icons
              .filter(icon =>
                icon.id.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .splice(0, 77),
          ),
        1000,
      );
    },
    [icons],
  );

  const LoadingSpinner = (
    <ReactLoading
      type="spin"
      color={theme.colors.secondaryText}
      width={25}
      height={25}
    />
  );

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});
      setIsLoading(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }

      setIsLoading(false);
    }

    onSubmitted();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Header>
          <h1>Nova categoria</h1>
        </Header>

        <Body>
          <Input
            containerClassName="form-group"
            name="title"
            placeholder="Título"
          />

          <Select
            async
            cacheOptions
            styles={{
              ...getCustomSelectOptionsModal(theme),
              menuList: (provided: CSSProperties) => ({
                ...provided,
                padding: '5px',
                display: 'grid',
                gridTemplateColumns:
                  '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                rowGap: '10px',
              }),
            }}
            defaultOptions
            loadOptions={loadCategoryOptions}
            name="icon"
            keyField="id"
            placeholder="Ícone"
            options={icons}
            components={{
              Option: CategoryIconOptionConfig,
              SingleValue: CategoryIconOptionConfig,
            }}
          />

          <ColorPicker
            containerClassName="form-group"
            name="color_dark"
            placeholder="Cor Dark"
          />
          <ColorPicker
            containerClassName="form-group"
            name="color_light"
            placeholder="Cor Light"
          />
        </Body>

        <Footer>
          <CancelButton type="button" onClick={onCancel} disabled={isLoading}>
            {isLoading ? LoadingSpinner : 'Cancelar'}
          </CancelButton>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? LoadingSpinner : 'Enviar'}
          </Button>
        </Footer>
      </Form>
    </Container>
  );
};

export default FormAddCategory;
