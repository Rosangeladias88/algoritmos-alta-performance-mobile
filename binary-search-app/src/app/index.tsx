import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const TAMANHO_LISTA = 1_000_000;

const numeros = Array.from(
  { length: TAMANHO_LISTA },
  (_, indice) => indice + 1
);

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

export default function HomeScreen() {
  const [valorBusca, setValorBusca] = useState('');
  const [resultado, setResultado] = useState('');
  const [tempo, setTempo] = useState(0);
  const [comparacoes, setComparacoes] = useState(0);

  function buscarNumero() {
    if (valorBusca.trim() === '') {
      setResultado('Digite um número válido.');
      setTempo(0);
      setComparacoes(0);
      return;
    }

    const alvo = Number(valorBusca);

    if (
      !Number.isInteger(alvo) ||
      alvo < 1 ||
      alvo > TAMANHO_LISTA
    ) {
      setResultado(
        `Digite um número inteiro entre 1 e ${TAMANHO_LISTA.toLocaleString(
          'pt-BR'
        )}.`
      );
      setTempo(0);
      setComparacoes(0);
      return;
    }

    // Execução usada para obter o resultado
    // e a quantidade real de comparações.
    const resultadoBusca = binarySearch(numeros, alvo);

    setComparacoes(resultadoBusca.comparacoes);

    if (resultadoBusca.indice !== -1) {
      setResultado(
        `Número encontrado no índice ${resultadoBusca.indice}.`
      );
    } else {
      setResultado('Número não encontrado.');
    }

    /*
      Benchmark:

      Como a Busca Binária é extremamente rápida,
      executamos o algoritmo muitas vezes e depois
      calculamos o tempo médio.
    */
    const repeticoes = 100_000;

    let acumulador = 0;

    const inicioTempo = performance.now();

    for (let i = 0; i < repeticoes; i++) {
      const busca = binarySearch(numeros, alvo);

      // Usamos o resultado para evitar que a execução
      // seja considerada irrelevante pelo motor JavaScript.
      acumulador += busca.indice;
      acumulador += busca.comparacoes;
    }

    const fimTempo = performance.now();

    const tempoTotal = fimTempo - inicioTempo;
    const tempoMedio = tempoTotal / repeticoes;

    // Apenas impede que o acumulador fique sem uso.
    if (acumulador === Number.MIN_SAFE_INTEGER) {
      console.log(acumulador);
    }

    setTempo(tempoMedio);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Busca Binária
      </Text>

      <Text style={styles.subtitle}>
        Análise de desempenho do algoritmo
      </Text>

      <Text style={styles.info}>
        Complexidade: O(log n)
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
        title="Executar Busca Binária"
        onPress={buscarNumero}
      />

      {resultado !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultado}>
            {resultado}
          </Text>

          <Text style={styles.algorithmTitle}>
            Resultado da Busca Binária
          </Text>

          <Text style={styles.metric}>
            Comparações: {comparacoes}
          </Text>

          <Text style={styles.metric}>
            Tempo médio: {tempo.toFixed(6)} ms
          </Text>

          <Text style={styles.metric}>
            Repetições do teste: 100.000
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