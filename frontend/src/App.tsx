import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import AppProvider from './hooks/index';

import Routes from './routes';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
    <ToastContainer />
  </Router>
);

export default App;
