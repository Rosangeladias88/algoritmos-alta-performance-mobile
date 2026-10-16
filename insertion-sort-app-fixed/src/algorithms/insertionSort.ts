export function insertionSort(numeros: number[]) {
  const lista = [...numeros];

  let comparacoes = 0;
  let movimentacoes = 0;

  for (let i = 1; i < lista.length; i++) {
    const atual = lista[i];
    let j = i - 1;

    while (j >= 0) {
      comparacoes++;

      if (lista[j] > atual) {
        lista[j + 1] = lista[j];
        movimentacoes++;
        j--;
      } else {
        break;
      }
    }

    lista[j + 1] = atual;
    movimentacoes++;
  }

  return {
    lista,
    comparacoes,
    movimentacoes,
  };
}
