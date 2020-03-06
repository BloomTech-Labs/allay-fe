import React from 'react';
import { render } from '@testing-library/react';
import Login from '../components/Auth/Login';

test('login component is rendered', () => {
	render(<Login />);
});

test('Login h3 is rendered', () => {
	const { getByText } = render(<Login />);
	getByText(/login/i);
});

test('Submit button is rendered', () => {
	const { getByText } = render(<Login />);
	getByText(/submit/i);
});

test('username and password inputs are rendered', () => {
	const { getByLabelText } = render(<Login />);
	getByLabelText(/username/i);
	getByLabelText(/password/i);
});
