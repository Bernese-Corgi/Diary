import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/global-style';
import theme from './style/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
