import React from 'react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import BenteviProvider from '../../context/BenteviProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<BenteviProvider>
      <Router history={ history }>
        {component}</Router></BenteviProvider>), history,
  });
};
export default renderWithRouter;
