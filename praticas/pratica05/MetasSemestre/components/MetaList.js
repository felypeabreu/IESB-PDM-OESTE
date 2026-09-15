import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import MetaItem from './MetaItem';

export default function MetaList({ metas, onDelete }) {
  if (metas.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTitulo}>Nenhuma meta cadastrada ainda</Text>
        <Text style={styles.vazioSubtitulo}>
          Use o campo acima para adicionar sua primeira meta de estudo.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MetaItem meta={item} onDelete={onDelete} />}
      contentContainerStyle={styles.lista}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 24,
    paddingTop: 4,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  vazioTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  vazioSubtitulo: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 6,
  },
});