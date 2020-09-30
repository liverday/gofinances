import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Routes from './routes';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
    <ToastContainer />
  </>
);

export default App;
