import { describe, expect, test } from '@jest/globals';
import { insertionSort } from '../algorithms/insertionSort';

describe('Teste de carga - Insertion Sort', () => {
  const tamanhos = [1000, 5000, 10000, 20000];

  test.each(tamanhos)(
    'deve ordenar %i elementos',
    (tamanho) => {
      const numeros = Array.from(
        { length: tamanho },
        (_, i) => tamanho - i
      );

      const inicio = performance.now();
      const resultado = insertionSort(numeros);
      const tempo = performance.now() - inicio;

      expect(resultado.lista).toHaveLength(tamanho);

      for (let i = 1; i < resultado.lista.length; i++) {
        expect(resultado.lista[i]).toBeGreaterThanOrEqual(
          resultado.lista[i - 1]
        );
      }

      console.log({
        elementos: tamanho,
        tempoMs: tempo.toFixed(4),
        comparacoes: resultado.comparacoes,
        movimentacoes: resultado.movimentacoes,
      });
    },
    60000
  );
});
