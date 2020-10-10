import React from 'react';

import { AppThemeProvider } from './theme';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AppThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppThemeProvider>
  );
};

export default AppProvider;
