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

  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);

    if (numeros[meio] === alvo) {
      return meio;
    }

    if (numeros[meio] < alvo) {
      inicio = meio + 1;
    } else {
      fim = meio - 1;
    }
  }

  return -1;
}

export default function HomeScreen() {
  const numeros = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72];

  const [valorBusca, setValorBusca] = useState('');
  const [resultado, setResultado] = useState('');

  function buscarNumero() {
    const alvo = Number(valorBusca);

    const indice = binarySearch(numeros, alvo);

    if (indice !== -1) {
      setResultado(`Número encontrado no índice ${indice}.`);
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
        Complexidade: O(log n)
      </Text>

      <Text style={styles.list}>
        Lista: {numeros.join(', ')}
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
        <Text style={styles.resultado}>
          {resultado}
        </Text>
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

  resultado: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});