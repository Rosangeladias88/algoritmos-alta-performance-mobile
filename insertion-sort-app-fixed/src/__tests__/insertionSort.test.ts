
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
});
