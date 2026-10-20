import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CATEGORIAS } from '../../util/despesas';

// Botões lado a lado (Pressable). Usado no formulário (seleção da categoria)
// e nas telas de listagem (filtro, com a opção extra "Todas").
function SeletorCategoria({ selecionada, onSelecionar, incluirTodas = false }) {
  const opcoes = incluirTodas
    ? [{ rotulo: 'Todas', valor: '' }, ...CATEGORIAS.map((c) => ({ rotulo: c, valor: c }))]
    : CATEGORIAS.map((c) => ({ rotulo: c, valor: c }));

  return (
    <View style={styles.linha}>
      {opcoes.map((opcao) => {
        const ativa = selecionada === opcao.valor;
        return (
          <Pressable
            key={opcao.rotulo}
            onPress={() => onSelecionar(opcao.valor)}
            style={[styles.botao, ativa && styles.botaoAtivo]}
          >
            <Text style={[styles.texto, ativa && styles.textoAtivo]}>
              {opcao.rotulo}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SeletorCategoria;

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  botao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e5e5',
    marginRight: 8,
    marginBottom: 8,
  },
  botaoAtivo: {
    backgroundColor: '#3e04c3',
  },
  texto: {
    fontSize: 13,
    color: '#333333',
  },
  textoAtivo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
