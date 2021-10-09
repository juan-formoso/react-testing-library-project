import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente <Pokemon.js', () => {
  it('Testa se renderiza um card com as informações do Pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weigth = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');
    const pokemon = pokemons[0];

    expect(name).toHaveTextContent(pokemon.name);
    expect(type).toHaveTextContent(pokemon.type);
    expect(weigth).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', pokemon.image);
    expect(img).toHaveAttribute('alt', `${pokemon.name} sprite`);
  });

  it('Testa se o card possui um link para exibir os detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const link = screen.getByRole('link', { name: 'More details' });

    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Testa se existe um ícone de estrela para os pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const link = screen.getByRole('link', { name: 'More details' });

    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);

    const fav = screen.getByRole('checkbox');
    userEvent.click(fav);

    const img = screen.getAllByRole('img')[1];
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
