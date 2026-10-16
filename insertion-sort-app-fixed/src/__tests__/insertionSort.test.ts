
import { describe, test, expect } from '@jest/globals';
import { insertionSort } from '../algorithms/insertionSort';

describe('Insertion Sort', () => {
  test('deve ordenar uma lista em ordem crescente', () => {
    const entrada = [5, 3, 8, 1, 2];

    const resultado = insertionSort(entrada);

    expect(resultado.lista).toEqual([1, 2, 3, 5, 8]);
  });

  test('deve manter uma lista já ordenada', () => {
    const entrada = [1, 2, 3, 4, 5];

    const resultado = insertionSort(entrada);

    expect(resultado.lista).toEqual([1, 2, 3, 4, 5]);
  });
  
test('deve retornar uma lista vazia quando a entrada estiver vazia', () => {
  const entrada: number[] = [];

  const resultado = insertionSort(entrada);

  expect(resultado.lista).toEqual([]);
});
test('deve ordenar uma lista com números repetidos', () => {
  const entrada = [4, 2, 4, 1, 2];

  const resultado = insertionSort(entrada);

  expect(resultado.lista).toEqual([1, 2, 2, 4, 4]);
});

test('deve ordenar uma lista com números negativos', () => {
  const entrada = [3, -2, 0, -5, 1];

  const resultado = insertionSort(entrada);

  expect(resultado.lista).toEqual([-5, -2, 0, 1, 3]);
});

});
