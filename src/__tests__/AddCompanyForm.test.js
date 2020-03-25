import React from 'react';
import AddCompanyForm from '../components/Dashboard/Forms/AddCompanyForm';
import { render } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

import store from '../store';
import App from '../App';

test('renders addCompanyForm', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App>
          <AddCompanyForm />
        </App>
      </BrowserRouter>
    </Provider>
  );
});
