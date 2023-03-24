import React from 'react';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Home from '../pages/Home/Home';

test('Testa se o Hello World está presente na tela!', () => {
  render(<Home />);
  const helloWorldElement = screen.getByText(/hello world!/i);
  expect(helloWorldElement).toBeInTheDocument();
});
