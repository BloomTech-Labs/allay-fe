import React from 'react';
import ReviewForm from '../components/Dashboard/ReviewForm';
import { render } from '@testing-library/react';

test.skip('get form placeholder text', () => {
  const { getByPlaceholderText } = render(<ReviewForm />);

  getByPlaceholderText(/Name of Company/i);
  getByPlaceholderText(/Job Title/i);
  getByPlaceholderText(/Job Location/i);
  getByPlaceholderText(/Salary/i);
  getByPlaceholderText(/Interview rating/i);
  getByPlaceholderText(/Describe the interview process/i);
  getByPlaceholderText(/Job rating 0-5/i);
  getByPlaceholderText(/Write a Review/i);
});

test.skip('renders add review text', () => {
  const { getByText } = render(<ReviewForm />);
  getByText(/add a review/i);
});
