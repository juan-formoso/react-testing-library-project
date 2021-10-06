import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  test('a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('About Pokédex');
  });
  test('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const texts = [
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
      'One can filter Pokémons by type,'
      + ' and see more details for each one of them',
    ];

    expect(screen.getByText(texts[0])).toBeInTheDocument();
    expect(screen.getByText(texts[1])).toBeInTheDocument();
  });
  test('A página contém uma imagem de uma Pokédex', () => {
    render(<About />);

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(screen.getByAltText('Pokédex').src).toBe(src);
  });
});
