import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getDataFormatada } from '../../util/datas';

function DespesaItem({ id, descricao, valor, data, categoria, onPress }) {
  return (
    <Pressable
      onPress={() => onPress && onPress(id)}
      style={({ pressed }) => pressed && styles.pressionado}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <View style={styles.linhaDetalhes}>
            <Text style={styles.data}>{getDataFormatada(data)}</Text>
            <View style={styles.tagCategoria}>
              <Text style={styles.textoCategoria}>{categoria}</Text>
            </View>
          </View>
        </View>
        <View style={styles.caixaValor}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressionado: {
    opacity: 0.75,
  },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#3e04c3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  linhaDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    color: '#e4d9fd',
    marginRight: 8,
  },
  // Tag de destaque da categoria: fundo cinza claro e bordas arredondadas.
  tagCategoria: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  textoCategoria: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  caixaValor: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 90,
    alignSelf: 'center',
  },
  valor: {
    color: '#3e04c3',
    fontWeight: 'bold',
  },
});
