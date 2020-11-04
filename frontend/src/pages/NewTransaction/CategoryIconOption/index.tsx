/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import * as Icons from 'react-icons/all';
import { OptionProps, OptionTypeBase } from 'react-select';
import { useTheme } from '../../../hooks/theme';

import { Container } from './styles';

const CategoryIconOption: React.FC<OptionProps<OptionTypeBase>> = ({
  innerProps,
  data,
}) => {
  const { theme } = useTheme();
  const { icon, title, background_color_light, background_color_dark } = data;
  const [, iconName] = icon.split('/');
  const Icon = (Icons as any)[iconName];
  return (
    <Container {...innerProps}>
      <Icon
        size={20}
        color={
          theme.title === 'dark'
            ? background_color_dark
            : background_color_light
        }
      />
      <span>{title}</span>
    </Container>
  );
};

export default CategoryIconOption;
