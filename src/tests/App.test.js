import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import BenteviProvider from '../context/BenteviProvider';
import {BrowserRouter} from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import Home from '../pages/Home/Home';
import mockedPosts from './mocks/mockPosts';

describe('Renderiza o app e testa se...', () => {
  beforeEach(() => {
    const setLocalStorage = (id, data) => {
      window.localStorage.setItem(id, JSON.stringify(data));
      return data;
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(setLocalStorage('user',
          {'email': 'raphaelbaere@id.uff.br',
            'firstName': 'Raphael',
            'lastName': 'Baere',
            'password': '321321321',
          },
      )).mockResolvedValue(setLocalStorage('index', 0)),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
    jest.restoreAllMocks();
  });
  test('a página do perfil está construída corretamente...', () => {
    render(
        <BrowserRouter>
          <BenteviProvider>
            <Profile />
          </BenteviProvider>
        </BrowserRouter>,
    );

    const profileNameElements = screen.getAllByText('Raphael Baere');
    const profileEmailElement = screen.getByText('raphaelbaere@id.uff.br');
    expect(profileNameElements[0]).toBeInTheDocument();
    expect(profileEmailElement).toBeInTheDocument();
  });
  test('A página do feed está construída corretamente', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedPosts),
    });

    render(
        <BrowserRouter>
          <BenteviProvider>
            <Home />
          </BenteviProvider>
        </BrowserRouter>,
    );
    const firstPostElement = await screen.findByText(`sunt aut facere repellat 
    provident occaecati excepturi optio reprehenderit`);
    await waitFor(() => {
      screen.findByText(`sunt aut facere repellat 
      provident occaecati excepturi optio reprehenderit`);
    }, {timeout: 10000});
    expect(firstPostElement).toBeInTheDocument();
  });
});
