import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa se o componente NotFound:', () => {
  test('Testa se contém um heading com o texto "Page request not found 😭"', () => {
    render(<NotFound />);
    const txt = 'Page requested not found Crying emoji';
    const heading = screen.getByRole('heading', { name: txt });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se contém uma imagem com código "kNSeTs31XBZ3G"', () => {
    render(<NotFound />);
    const altTxt = 'Pikachu crying because the page requested was not found';
    const image = screen.getByRole('img', { name: altTxt });
    expect(image.src).toContain('kNSeTs31XBZ3G');
  });
});
