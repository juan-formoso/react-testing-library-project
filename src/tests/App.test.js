import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  test(`se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });

    userEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
  });

  test(`se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });

    userEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  test(`se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const linkFavoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(linkFavoritePokemons);

    expect(history.location.pathname).toBe('/favorites');
  });

  test(`se a aplicação é redirecionada para a página Not Found
   ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pikachu');

    const textNotFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });

    expect(textNotFound).toBeInTheDocument();
  });
});
