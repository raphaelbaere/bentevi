import React from 'react';
import '@testing-library/jest-dom';
import {screen} from '@testing-library/react';
import Home from '../pages/Home/Home';
import {renderWithRouter} from './helpers/renderWithRouter';

test('Teste!', () => {
  renderWithRouter(<Home />);
  const helloWorldElement = screen.getByText(/BENTEVI/i);
  expect(helloWorldElement).toBeInTheDocument();
});
