import { StyleSheet, Text, View } from 'react-native';

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

// Recebe a lista já filtrada: a lista e o sumário se atualizam sozinhos.
function DespesaSaida({ despesas, periodo, onPressItem, mensagemVazia }) {
  return (
    <View style={styles.container}>
      <DespesaSumario despesas={despesas} periodo={periodo} />
      {despesas.length > 0 ? (
        <DespesaLista despesas={despesas} onPressItem={onPressItem} />
      ) : (
        <Text style={styles.vazio}>
          {mensagemVazia || 'Nenhuma despesa encontrada.'}
        </Text>
      )}
    </View>
  );
}

export default DespesaSaida;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  vazio: {
    marginTop: 32,
    textAlign: 'center',
    color: '#666666',
    fontSize: 15,
  },
});
