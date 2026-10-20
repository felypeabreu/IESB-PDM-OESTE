import { StyleSheet, Text, View } from 'react-native';

const LIMITE_ALERTA = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + item.valor,
    0
  );

  // Desafio extra: acima de R$ 200,00 o valor fica vermelho.
  const ultrapassouLimite = somaDespesas > LIMITE_ALERTA;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, ultrapassouLimite && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#e4d9fd',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: {
    fontSize: 12,
    color: '#5721d4',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3e04c3',
  },
  somaAlerta: {
    color: '#d00000',
  },
});
