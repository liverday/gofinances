import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { useTheme } from '../../hooks/theme';

import getCustomSelectOptions from '../../utils/getCustomSelectOptions';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  keyField?: string;
}

const Select: React.FC<Props> = ({ name, keyField = 'value', ...rest }) => {
  const { theme } = useTheme();
  const selectRef = useRef(null);

  const { fieldName, defaultValue, registerField } = useField(name);
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
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value[keyField];
      },
      clearValue: (ref: any) => {
        ref.select.clearValue();
      },
    });
  }, [fieldName, registerField, rest.isMulti, keyField]);

  return (
    <ReactSelect
      defaultValue={defaultValue}
      classNamePrefix="react-select"
      styles={getCustomSelectOptions(theme)}
      ref={selectRef}
      {...rest}
    />
  );
};

export default Select;
