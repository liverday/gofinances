import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useField } from '@unform/core';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';

import { Container, TypeInput } from './styles';

export type SelectedType = 'income' | 'outcome' | null;

interface TransactionTypeSelectorProps {
  name: string;
  onSelect(selectedType: SelectedType): void;
}

const TransactionTypeSelector: React.FC<TransactionTypeSelectorProps> = ({
  name,
  onSelect,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [selectedType, setSelectedType] = useState<SelectedType>(() => {
    if (defaultValue) {
      setTimeout(() => onSelect(defaultValue), 300);
    }

    return defaultValue;
  });

  useEffect(() => {
    registerField<string | null>({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        const refChecked = refs.filter(ref => ref.checked)[0];
        return refChecked ? refChecked.value : null;
      },
      setValue: (refs: HTMLInputElement[], value: string | null) => {
        refs.forEach(ref => {
          // eslint-disable-next-line no-param-reassign
          ref.checked = false;
        });
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField, setSelectedType]);

  const handleSelect = useCallback(
    (newSelectedType: SelectedType) => {
      setSelectedType(newSelectedType);
      onSelect(newSelectedType);
    },
    [onSelect],
  );

  return (
    <Container>
      <TypeInput
        transactionType="income"
        isActive={selectedType === 'income'}
        onClick={() => handleSelect('income')}
      >
        <input
          type="radio"
          ref={ref => {
            inputRefs.current[0] = ref as HTMLInputElement;
          }}
          value="income"
        />
        <span>Entrada</span>
        <img src={income} alt="income" />
      </TypeInput>

      <TypeInput
        transactionType="outcome"
        isActive={selectedType === 'outcome'}
        onClick={() => handleSelect('outcome')}
      >
        <input
          type="radio"
          ref={ref => {
            inputRefs.current[1] = ref as HTMLInputElement;
          }}
          value="outcome"
        />
        <span>Saída</span>
        <img src={outcome} alt="outcome" />
      </TypeInput>
    </Container>
  );
};

export default TransactionTypeSelector;
