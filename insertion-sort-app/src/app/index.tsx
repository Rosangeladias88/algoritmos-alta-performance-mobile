import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function insertionSort(numeros: number[]) {
  const lista = [...numeros];
  let comparacoes = 0;

  for (let i = 1; i < lista.length; i++) {
    const atual = lista[i];
    let j = i - 1;

    while (j >= 0 && lista[j] > atual) {
      lista[j + 1] = lista[j];
      comparacoes++;
      j--;
    }

    lista[j + 1] = atual;
  }

  return {
    lista,
    comparacoes
  };
}

export default function HomeScreen() {
  const numerosIniciais = [38, 5, 23, 8, 45, 2, 72, 16, 56, 12];

  const [numerosOrdenados, setNumerosOrdenados] = useState<number[]>([]);
  const [comparacoes, setComparacoes] = useState(0);

  function ordenarNumeros() {
    const resultado = insertionSort(numerosIniciais);
    setNumerosOrdenados(resultado.lista);
    setComparacoes(resultado.comparacoes);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insertion Sort</Text>

      <Text style={styles.subtitle}>
        Ordenação por inserção
      </Text>

      <Text style={styles.info}>
        Complexidade: O(n²)
      </Text>

      <Text style={styles.list}>
        Lista original: {numerosIniciais.join(', ')}
      </Text>

      <Button
        title="Ordenar"
        onPress={ordenarNumeros}
      />

      {numerosOrdenados.length > 0 && (
  <View>
    <Text style={styles.resultado}>
      Lista ordenada: {numerosOrdenados.join(', ')}
    </Text>

    <Text style={styles.resultado}>
      Comparações realizadas: {comparacoes}
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
  },

  info: {
    fontSize: 16,
    marginBottom: 24,
  },

  list: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },

  resultado: {
    fontSize: 16,
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});