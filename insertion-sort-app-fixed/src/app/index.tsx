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

export default function HomeScreen() {
  const [executado, setExecutado] = useState(false);
  const [comparacoes, setComparacoes] = useState(0);
  const [movimentacoes, setMovimentacoes] = useState(0);
  const [tempo, setTempo] = useState(0);

  function ordenar() {
    const inicioTempo = performance.now();

    const resultado = insertionSort(listaOriginal);

    const fimTempo = performance.now();

    const tempoExecucao = fimTempo - inicioTempo;

    setComparacoes(resultado.comparacoes);
    setMovimentacoes(resultado.movimentacoes);
    setTempo(tempoExecucao);
    setExecutado(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Insertion Sort
      </Text>

      <Text style={styles.subtitle}>
        Análise de desempenho do algoritmo
      </Text>

      <Text style={styles.info}>
        Complexidade: O(n²)
      </Text>

      <Text style={styles.list}>
        Quantidade de elementos: {TAMANHO_LISTA.toLocaleString('pt-BR')}
      </Text>

      <Text style={styles.list}>
        Entrada: lista em ordem inversa
      </Text>

      <Button
        title="Executar Insertion Sort"
        onPress={ordenar}
      />

      {executado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultado}>
            Lista ordenada com sucesso!
          </Text>

          <Text style={styles.algorithmTitle}>
            Resultado do Insertion Sort
          </Text>

          <Text style={styles.metric}>
            Elementos ordenados: {TAMANHO_LISTA.toLocaleString('pt-BR')}
          </Text>

          <Text style={styles.metric}>
            Comparações: {comparacoes.toLocaleString('pt-BR')}
          </Text>

          <Text style={styles.metric}>
            Movimentações: {movimentacoes.toLocaleString('pt-BR')}
          </Text>

          <Text style={styles.metric}>
            Tempo de execução: {tempo.toFixed(4)} ms
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
    textAlign: 'center',
  },

  info: {
    fontSize: 17,
    marginBottom: 16,
  },

  list: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
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

  algorithmTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  metric: {
    fontSize: 16,
    marginBottom: 6,
    textAlign: 'center',
  },
});