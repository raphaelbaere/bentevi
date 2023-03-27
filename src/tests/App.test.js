/* eslint-disable max-len */
import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import BenteviProvider from '../context/BenteviProvider';
import {BrowserRouter} from 'react-router-dom';
import Profile from '../pages/Profile/Profile';
import Home from '../pages/Home/Home';
import mockedPosts from './mocks/mockPosts';
import userEvent from '@testing-library/user-event';
import {act} from 'react-dom/test-utils';

describe('Renderiza o app e testa se...', () => {
  beforeEach(() => {
    act(async () => {
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
  });

  afterEach(() => {
    global.fetch.mockClear();
    jest.restoreAllMocks();
  });
  test('a página do perfil está construída corretamente...', () => {
    act(() => {
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
  });
  test('a página do feed está construída corretamente', async () => {
    act(async () => {
      global.fetch.mockClear();
      jest.restoreAllMocks();
      jest.clearAllMocks();
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
      const firstPostElement = await screen.findByText(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/);
      expect(firstPostElement).toBeInTheDocument();
    });
  });
  test('se o botão de excluir os posts funciona corretamente', async () => {
    act(async () => {
      global.fetch.mockClear();
      jest.restoreAllMocks();
      jest.clearAllMocks();
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
      const firstPostElement = await screen.findByText(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/);
      expect(firstPostElement).toBeInTheDocument();
      const allMoreVertIcons = await screen.findAllByTestId('MoreVertIcon');
      expect(allMoreVertIcons[0]).toBeInTheDocument();
      userEvent.click(allMoreVertIcons[0]);
      const allRemoveButton = await screen.findAllByTestId('remove-button');
      expect(allRemoveButton[0]).toBeInTheDocument();
      userEvent.click(allRemoveButton[0]);
      await waitFor(() => expect(firstPostElement).not.toBeInTheDocument());
    });
  });
  test('se o botão de curtir os posts funciona corretamente', async () => {
    act(async () => {
      global.fetch.mockClear();
      jest.restoreAllMocks();
      jest.clearAllMocks();
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
      const firstPostElement = await screen.findByText(/qui est esse/);
      expect(firstPostElement).toBeInTheDocument();
      const firstLikeButton = await screen.findAllByTestId('like-button');
      expect(firstLikeButton[0]).toBeInTheDocument();
      userEvent.click(firstLikeButton[0]);
      const oneLike = await screen.findByTestId('one-like');
      expect(oneLike).toBeInTheDocument();
      expect(firstLikeButton[0]).not.toBeInTheDocument();
    });
  });
  test.skip('se o botão de adicionar um post funciona corretamente', async () => {
    global.fetch.mockClear();
    jest.restoreAllMocks();
    jest.clearAllMocks();
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
    const addPostButton = await screen.findByTestId(/add-post/);
    expect(addPostButton).toBeInTheDocument();
    userEvent.click(addPostButton);
    const newPostContainer = await screen.findByTestId(/new-post-container/);
    await waitFor(() => expect(newPostContainer).toBeInTheDocument());
    expect(newPostContainer).toBeInTheDocument();
    const inputNewPostText = await screen.findByTestId(/newpost-input-text/);
    expect(inputNewPostText).toBeInTheDocument();
    await userEvent.click(inputNewPostText);
    await userEvent.clear(inputNewPostText);
    await waitFor(async ()=>{
      await userEvent.type(inputNewPostText, 'Esse é o meu post de teste!');
      expect(inputNewPostText).toHaveValue('Esse é o meu post de teste!');
    });
    expect(inputNewPostText).toHaveValue(/Esse é o meu post de teste!/i);
    const createPostButton = await screen.findByTestId(/create-post-button/);
    expect(createPostButton).toBeInTheDocument();
    userEvent.click(createPostButton);
    const newPostCreated = await screen.findByText(/Esse é o meu post de teste!/i);
    await waitFor(() => expect(newPostCreated).toBeInTheDocument());
  });
});
