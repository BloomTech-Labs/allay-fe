import React from 'react';

import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'mutationobserver-shim';

import store from '../store';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
});
