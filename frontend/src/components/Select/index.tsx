/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionsType,
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import AsyncReactSelect from 'react-select/async';

import { useField } from '@unform/core';

import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  keyField?: string;
  async?: boolean;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsType<OptionTypeBase>) => void,
  ) => Promise<any> | void;
}

const Select: React.FC<Props> = ({
  name,
  keyField = 'value',
  async = false,
  loadOptions,
  ...rest
}) => {
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (async) {
          if (!ref.select.state.value) {
            return '';
          }

          return ref.select.state.value[keyField];
        }

        if (!ref.state.value) {
          return '';
        }
        return ref.state.value[keyField];
      },
      clearValue: (ref: any) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti, keyField, async]);

  return (
    <Container hasError={!!error}>
      {async ? (
        <AsyncReactSelect
          loadOptions={loadOptions!}
          classNamePrefix="react-select"
          placeholder="Selecione uma opção"
          ref={selectRef}
          {...rest}
        />
      ) : (
        <ReactSelect
          defaultValue={defaultValue}
          classNamePrefix="react-select"
          placeholder="Selecione uma opção"
          ref={selectRef}
          {...rest}
        />
      )}
    </Container>
  );
};

export default Select;
