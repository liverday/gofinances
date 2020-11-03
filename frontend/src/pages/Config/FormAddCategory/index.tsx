import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container, Header, Footer, CancelButton, Body } from './styles';

import Button from '../../../components/Button';
import ColorPicker from '../../../components/ColorPicker';
import Input from '../../../components/Input';

interface FormAddCategoryProps {
  onSubmit(data: any): void;
  onCancel(): void;
}

const FormAddCategory: React.FC<FormAddCategoryProps> = ({
  onSubmit,
  onCancel,
}) => {
  const formRef = useRef<FormHandles>(null);

  return (
    <Container>
      <Form onSubmit={onSubmit} ref={formRef}>
        <Header>
          <h1>Nova categoria</h1>
        </Header>

        <Body>
          <Input
            containerClassName="form-group"
            name="title"
            placeholder="Título"
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
          <CancelButton type="button" onClick={onCancel}>
            Cancelar
          </CancelButton>
          <Button type="submit" onClick={() => onSubmit({})}>
            Enviar
          </Button>
        </Footer>
      </Form>
    </Container>
  );
};

export default FormAddCategory;
