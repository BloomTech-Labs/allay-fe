import React from 'react';
import { render } from '@testing-library/react';
import Signup from '../components/Auth/Signup';

// delete me
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@chakra-ui/core';
import theme from '../theme/customTheme';
import 'mutationobserver-shim';

test('signup component is rendered', () => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
});

test.skip('Signup h3 is rendered', () => {
  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
  getByText(/signup/i);
});

test.skip('Submit button is rendered', () => {
  const { getByText } = render(<Signup />);
  getByText(/submit/i);
});

test.skip('username, email, password, and confirm password inputs are rendered', () => {
  const { getByLabelText } = render(<Signup />);
  getByLabelText(/username/i);
  getByLabelText(/email/i);
  getByLabelText(/password/i);
  getByLabelText(/confirm password/i);
});
