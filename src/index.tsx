import React from 'react';
import 'modern-css-reset';
import 'whatwg-fetch';
import 'rc-slider/assets/index.css';
import ReactDOM from 'react-dom/client';
import App from './features/App';
import { FormProvider } from 'contexts/Form';
import ThemeProvider from 'contexts/Theme';
import { ErrorsProvider } from 'contexts/Errors';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorsProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </ErrorsProvider>
    </ThemeProvider>
  </React.StrictMode>
);


