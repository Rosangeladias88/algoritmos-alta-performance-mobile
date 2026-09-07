import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const TAMANHO_LISTA = 5000;

const listaOriginal = Array.from(
  { length: TAMANHO_LISTA },
  (_, indice) => TAMANHO_LISTA - indice
);

function insertionSort(numeros: number[]) {
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

function selectionSort(numeros: number[]) {
  const lista = [...numeros];
  let comparacoes = 0;
  let movimentacoes = 0;

  for (let i = 0; i < lista.length - 1; i++) {
    let indiceMenor = i;

    for (let j = i + 1; j < lista.length; j++) {
      comparacoes++;

      if (lista[j] < lista[indiceMenor]) {
        indiceMenor = j;
      }
    }

    if (indiceMenor !== i) {
      const temporario = lista[i];
      lista[i] = lista[indiceMenor];
      lista[indiceMenor] = temporario;

      movimentacoes += 3;
    }
  }

  return {
    lista,
    comparacoes,
    movimentacoes,
  };
}
export default function HomeScreen() {
  const [listaOrdenada, setListaOrdenada] = useState<number[]>([]);
  const [comparacoes, setComparacoes] = useState(0);
  const [movimentacoes, setMovimentacoes] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [comparacoesSelection, setComparacoesSelection] = useState(0);
const [movimentacoesSelection, setMovimentacoesSelection] = useState(0);
const [tempoSelection, setTempoSelection] = useState(0);

  function ordenar() {
    const inicio = performance.now();

    const resultado = insertionSort(listaOriginal);
    const fim = performance.now();

    const inicioSelection = performance.now();
const resultadoSelection = selectionSort(listaOriginal);
const fimSelection = performance.now();
    

    setListaOrdenada(resultado.lista);
    setComparacoes(resultado.comparacoes);
    setMovimentacoes(resultado.movimentacoes);
    setTempo(fim - inicio);
    setComparacoesSelection(resultadoSelection.comparacoes);
setMovimentacoesSelection(resultadoSelection.movimentacoes);
setTempoSelection(fimSelection - inicioSelection);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insertion Sort</Text>

      <Text style={styles.subtitle}>
        Análise de desempenho do algoritmo
      </Text>

      <Text style={styles.info}>
        Complexidade: O(n²)
      </Text>

      <Text style={styles.list}>
  Quantidade de elementos: {TAMANHO_LISTA}
</Text>

      <Button
        title="Ordenar"
        onPress={ordenar}
      />

     {listaOrdenada.length > 0 && (
  <View style={styles.resultContainer}>
    <Text style={styles.resultado}>
      Lista ordenada com sucesso: {listaOrdenada.length} elementos
    </Text>

    <Text style={styles.resultado}>
      Insertion Sort
    </Text>

    <Text style={styles.metric}>
      Comparações: {comparacoes}
    </Text>

    <Text style={styles.metric}>
      Movimentações: {movimentacoes}
    </Text>

    <Text style={styles.metric}>
      Tempo: {tempo.toFixed(4)} ms
    </Text>

    <Text style={styles.resultado}>
      Selection Sort
    </Text>

    <Text style={styles.metric}>
      Comparações: {comparacoesSelection}
    </Text>

    <Text style={styles.metric}>
      Movimentações: {movimentacoesSelection}
    </Text>

    <Text style={styles.metric}>
      Tempo: {tempoSelection.toFixed(4)} ms
    </Text>
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 24,
  },

  info: {
    fontSize: 17,
    marginBottom: 20,
  },

  list: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },

  resultContainer: {
    marginTop: 24,
    alignItems: 'center',
  },

  resultado: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },

  metric: {
    fontSize: 16,
    marginBottom: 6,
  },
});