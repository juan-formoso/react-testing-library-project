import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa se FavoritePokemons:', () => {
  test('Mostra o texto "No favorite pokemon found" se não tiver favoritos', () => {
    render(<FavoritePokemons />);
    const noFavMensage = screen.getByText('No favorite pokemon found');
    expect(noFavMensage).toBeInTheDocument();
  });

  test('Se os pokémons favoritos aparecem', () => {
    render(<Router history={ createMemoryHistory() }><App /></Router>);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);
    const favCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheck);
    const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favLink);
    const favPokemon = screen.getByText(/Average weight:/);
    expect(favPokemon).toBeInTheDocument();
  });
});
