import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa a Pokedex', () => {
  test('Testa se há um heading com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  describe('Testa o botão Próximo Pokemon', () => {
    test(`Testa se o botão possui o texto Próximo Pokemon e se o primeiro é exibido após
    o último`, () => {
      renderWithRouter(<App />);
      const nextBtn = screen.getByTestId('next-pokemon',
        { name: 'Próximo pokémon' });
      expect(nextBtn).toBeInTheDocument();
      const pokeName = screen.getByTestId('pokemon-name');
      pokemons.forEach((pokemon, i) => {
        const lastPoke = pokemons.length - 1;
        if (i === lastPoke) {
          userEvent.click(nextBtn);
          expect(pokeName).toHaveTextContent('Pikachu');
        } else {
          userEvent.click(nextBtn);
        }
      });
    });

    test('Testa se apresenta um pokemon por vez', () => {
      renderWithRouter(<App />);
      const shownPokemons = screen.getAllByRole('img');
      expect(shownPokemons.length).toBe(1);
    });
  });

  describe('Testa os botões de filtro', () => {
    test('Testa se existem botões de filtros', () => {
      renderWithRouter(<App />);
      const filterBtn = screen.getAllByTestId('pokemon-type-button');
      filterBtn.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
    test(`Testa se cada tipo de pokemon possui um filtro e se a partir da
    seleção deles a Pokédex realiza a busca`, () => {
      renderWithRouter(<App />);
      const arrOfTypes = pokemons.map((pokemon) => pokemon.type);
      const nextBtn = screen.getByTestId('next-pokemon',
        { name: 'Próximo pokémon' });
      arrOfTypes.forEach((type) => {
        const filterByTypeBtn = screen.getByRole('button', {
          name: type,
        });
        expect(filterByTypeBtn).toBeInTheDocument();
        userEvent.click(filterByTypeBtn);
        const pokeTypes = pokemons.filter((pokemon) => pokemon.type === type);
        pokeTypes.forEach((pokemon) => {
          expect(pokemon.type).toBe(type);
          userEvent.click(nextBtn);
        });
      });
    });

    test('Testa se há um botão All que demonstra todos os Pokémons na Pokédex', () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByRole('button', {
        name: 'All',
      });
      expect(allBtn).toBeInTheDocument();
      userEvent.click(allBtn);
      const poke = screen.getByText('Pikachu');
      expect(poke).toBeInTheDocument();
    });
  });
});
