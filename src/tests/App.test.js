import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = () => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        <App />
      </Router>,
    ),
    history,
  });
};

describe('Verifica se os links de navegação funcionam devidamente.', () => {
  it('Testa se o número de links e nomes esperados.', () => {
    renderWithRouter();
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavPoke).toBeInTheDocument();
  });

  it('Testa se o link Home redireciona para URL:"/"', () => {
    const { history } = renderWithRouter();
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o link About redireciona para URL:"/about"', () => {
    const { history } = renderWithRouter();
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se o link Favorite Pokémons redireciona para URL:"/favorites"', () => {
    const { history } = renderWithRouter();
    const linkFavPokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavPokemon);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se é redirecionado a página Not Found quando a URL não existe', () => {
    const { history } = renderWithRouter();
    history.push('anyUrl');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
