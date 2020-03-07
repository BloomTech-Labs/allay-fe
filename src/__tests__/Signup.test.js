import React from 'react';
import { render } from '@testing-library/react';
import Signup from '../components/Auth/Signup';

test('signup component is rendered', () => {
	render(<Signup />);
});

test('Signup h3 is rendered', () => {
	const { getByText } = render(<Signup />);
	getByText(/signup/i);
});

test('Submit button is rendered', () => {
	const { getByText } = render(<Signup />);
	getByText(/submit/i);
});

test('username, email, password, and confirm password inputs are rendered', () => {
	const { getByLabelText } = render(<Signup />);
	getByLabelText(/username/i);
	getByLabelText(/email/i);
	getByLabelText(/password/i);
	getByLabelText(/confirm password/i);
});
