import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function formatarData(dataIso) {
  try {
    const data = new Date(dataIso);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function MetaItem({ meta, onDelete }) {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <Text style={styles.texto}>{meta.texto}</Text>
        <Text style={styles.data}>Criada em {formatarData(meta.criadaEm)}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.deletar,
          pressed && styles.deletarPressionado,
        ]}
        onPress={() => onDelete(meta.id)}
        android_ripple={{ color: '#ff000030', borderless: false }}
      >
        <Text style={styles.deletarTexto}>Remover</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#eeeef4',
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  texto: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  data: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  deletar: {
    backgroundColor: '#ffe4e4',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    overflow: 'hidden',
  },
  deletarPressionado: {
    opacity: 0.7,
  },
  deletarTexto: {
    color: '#c0392b',
    fontWeight: 'bold',
    fontSize: 12,
  },
});