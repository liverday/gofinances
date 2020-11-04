import React, { useCallback, useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { Container, Title, NewTransactonContainer, Footer } from './styles';

import { useTheme } from '../../hooks/theme';

import api from '../../services/api';
import { Category } from '../../services/interfaces';
import getValidationErrors from '../../utils/getValidationErrors';
import getCustomSelectOptions from '../../utils/getCustomSelectOptions';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';
import CategoryIconOption from './CategoryIconOption';
import CategoryIconSingleValue from './CategoryIconSingleValue';

import TransactionTypeSelector, {
  SelectedType,
} from '../../components/TransactionTypeSelector';

interface NewTransactionFormData {
  title: string;
  type: string;
  value: string;
  category: string;
}

const NewTransaction: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme } = useTheme();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function fetchCategories(): Promise<void> {
      const { data } = await api.get('/categories');

      setCategories(data);
    }

    fetchCategories();
  }, []);

  const handleSubmit = useCallback(async (formData: NewTransactionFormData) => {
    try {
      formRef.current?.setErrors({});
      setIsLoading(true);

      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        type: Yup.string().required(),
        value: Yup.number().required('Valor é obrigatório'),
        category: Yup.string().required('Categoria é obrigatória'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await api.post('/transactions', {
        title: formData.title,
        type: formData.type,
        value: parseFloat(formData.value),
        category_id: formData.category,
      });

      toast.success('Transação cadastrada com sucesso');
      formRef.current?.reset();
      setIsLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else if (formData.type === 'income') {
        toast.error(
          'Não foi possível cadastrar a entrada. Verifique os dados e tente novamente',
        );
      } else {
        toast.error(
          'Não foi possível cadastrar a saída, cheque se há salvo disponível e tente novamente',
        );
      }

      setIsLoading(false);
    }
  }, []);

  const handleTypeSelect = useCallback((selectedType: SelectedType) => {
    formRef.current?.setFieldValue('type', selectedType);
  }, []);

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Nova Transação</Title>
        <NewTransactonContainer>
          <Form
            ref={formRef}
            initialData={{ type: 'income' }}
            onSubmit={handleSubmit}
          >
            <Input
              name="title"
              containerClassName="form-group"
              placeholder="Título"
            />

            <TransactionTypeSelector name="type" onSelect={handleTypeSelect} />

            {/* <Input
              name="category"
              containerClassName="form-group"
              placeholder="Categoria"
            /> */}

            <Select
              name="category"
              keyField="id"
              options={categories}
              styles={getCustomSelectOptions(theme)}
              getOptionLabel={category => category.title}
              components={{
                Option: CategoryIconOption,
                SingleValue: CategoryIconSingleValue,
              }}
            />

            <Input
              name="value"
              containerClassName="form-group"
              placeholder="Valor"
              type="number"
            />

            <Footer>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div>
                    <ReactLoading
                      type="spin"
                      color={theme.colors.secondaryText}
                      width={25}
                      height={25}
                    />
                  </div>
                ) : (
                  'Enviar'
                )}
              </Button>
            </Footer>
          </Form>
        </NewTransactonContainer>
      </Container>
    </>
  );
};

export default NewTransaction;
