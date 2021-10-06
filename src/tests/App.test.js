import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

describe('Checks if the navegation links works correctly.', () => {
  it('Checks the amount of links and names expected.', () => {
    renderWithRouter();
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pókemons' });
    expect(favPokemonsLink).toBeInTheDocument();
  });

  it('Checks if the link Home directs to the URL:"/"', () => {
    const { history } = renderWithRouter;
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Checks if the link About directs to the URL:"/about"', () => {
    const { history } = renderWithRouter;
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Checks if the link Favorite Pokémons directs to the URL:"/favorites"', () => {
    const { history } = renderWithRouter;
    const favPokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Checks if the link Favorite Pokémons directs to the URL:"/favorites"', () => {
    const { history } = renderWithRouter;
    history.push('anyURL');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeInTheDocument();
  });
});
