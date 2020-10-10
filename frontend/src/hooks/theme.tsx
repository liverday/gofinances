import React, { useCallback, useContext, createContext } from 'react';
import { ThemeProvider } from 'styled-components';

import usePersistedState from './usePersistedState';

import Theme from '../styles/themes/theme';
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface ThemeContextData {
  theme: Theme;
  toggleTheme(): void;
}

const ThemeContext = createContext({} as ThemeContextData);

export const AppThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<Theme>(
    '@GO_FINANCES/theme',
    light,
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error('useAuth must be used within an AppThemeProvider');

  return context;
}
