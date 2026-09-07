import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function binarySearch(numeros: number[], alvo: number) {
  let inicio = 0;
  let fim = numeros.length - 1;
  let comparacoes = 0;

  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);

    comparacoes++;

    if (numeros[meio] === alvo) {
      return {
        indice: meio,
        comparacoes,
      };
    }

    if (numeros[meio] < alvo) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  return {
    indice: -1,
    comparacoes,
  };
}

function linearSearch(numeros: number[], alvo: number) {
  let comparacoes = 0;

  for (let i = 0; i < numeros.length; i++) {
    comparacoes++;

    if (numeros[i] === alvo) {
      return {
        indice: i,
        comparacoes,
      };
    }
  }

  return {
    indice: -1,
    comparacoes,
  };
}

const TAMANHO_LISTA = 1_000_000;

const numeros = Array.from(
  { length: TAMANHO_LISTA },
  (_, indice) => indice + 1
);

export default function HomeScreen() {
  const [valorBusca, setValorBusca] = useState('');
  const [resultado, setResultado] = useState('');

  const [tempo, setTempo] = useState(0);
  const [comparacoes, setComparacoes] = useState(0);

  const [tempoLinear, setTempoLinear] = useState(0);
  const [comparacoesLinear, setComparacoesLinear] = useState(0);

  function buscarNumero() {
    const alvo = Number(valorBusca);

    const repeticoes = 100000;

    const inicioTempo = performance.now();

    let ultimaBusca = binarySearch(numeros, alvo);

    for (let i = 1; i < repeticoes; i++) {
      ultimaBusca = binarySearch(numeros, alvo);
    }

    const fimTempo = performance.now();

    const tempoTotal = fimTempo - inicioTempo;
    const tempoMedio = tempoTotal / repeticoes;

    setTempo(tempoMedio);
    setComparacoes(ultimaBusca.comparacoes);

    const inicioLinear = performance.now();

    const resultadoLinear = linearSearch(numeros, alvo);

    const fimLinear = performance.now();

    setTempoLinear(fimLinear - inicioLinear);
    setComparacoesLinear(resultadoLinear.comparacoes);

    if (ultimaBusca.indice !== -1) {
      setResultado(
        `Número encontrado no índice ${ultimaBusca.indice}.`
      );
    } else {
      setResultado('Número não encontrado.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busca Binária</Text>

      <Text style={styles.subtitle}>
        Análise de desempenho do algoritmo
      </Text>

      <Text style={styles.info}>
        Busca Binária: O(log n)
      </Text>

      <Text style={styles.info}>
        Busca Linear: O(n)
      </Text>

      <Text style={styles.list}>
        Lista ordenada: 1 até{' '}
        {TAMANHO_LISTA.toLocaleString('pt-BR')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um número"
        keyboardType="numeric"
        value={valorBusca}
        onChangeText={setValorBusca}
      />

      <Button
        title="Buscar"
        onPress={buscarNumero}
      />

      {resultado !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultado}>
            {resultado}
          </Text>

          <Text style={styles.algorithmTitle}>
            Busca Binária
          </Text>

          <Text style={styles.metric}>
            Comparações: {comparacoes}
          </Text>

          <Text style={styles.metric}>
            Tempo médio: {tempo.toFixed(6)} ms
          </Text>

          <Text style={styles.algorithmTitle}>
            Busca Linear
          </Text>

          <Text style={styles.metric}>
            Comparações: {comparacoesLinear}
          </Text>

          <Text style={styles.metric}>
            Tempo: {tempoLinear.toFixed(4)} ms
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },

  info: {
    fontSize: 16,
    marginTop: 4,
  },

  list: {
    fontSize: 16,
    marginTop: 24,
    textAlign: 'center',
  },

  input: {
    width: '100%',
    maxWidth: 300,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginTop: 24,
    marginBottom: 12,
    fontSize: 16,
  },

  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  resultado: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  algorithmTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
  },

  metric: {
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
});