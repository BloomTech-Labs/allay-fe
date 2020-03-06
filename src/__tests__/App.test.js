import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import { useLocation } from 'react-router-dom';

test.skip('renders learn react link', () => {
	const { getByText } = render(<App />);
});
