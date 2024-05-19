import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from './Router/router';

test('renders homepage when "/" is accessed', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Router />
    </MemoryRouter>
  );

  const homepageElement = screen.getByText(/khelnepal/i);
  expect(homepageElement).toBeInTheDocument();
});

test('redirects to login page when "/login" is accessed', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <Router />
    </MemoryRouter>
  );

  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});

test('renders about page when "/aboutus" is accessed', () => {
  render(
    <MemoryRouter initialEntries={['/aboutus']}>
      <Router />
    </MemoryRouter>
  );

  const aboutElement = screen.getByText(/about us/i);
  expect(aboutElement).toBeInTheDocument();
});
