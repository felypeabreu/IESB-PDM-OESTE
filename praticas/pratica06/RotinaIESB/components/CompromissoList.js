// components/CompromissoList.js
// Aula 05 - Componentização e Props
// Aula 06 - Eventos (Pressable + remoção) e identificadores únicos
// Recebe a lista de itens, a função de remoção e os rótulos do pai.

import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Platform } from 'react-native';

function Item({ item, onDelete }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemTextoContainer}>
        <Text style={styles.itemTexto}>{item.texto}</Text>
        <Text style={styles.itemData}>{item.criadoEm}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.botaoRemover,
          pressed && Platform.OS === 'ios' && styles.botaoRemoverPressionado,
        ]}
        android_ripple={{ color: '#7f1d1d' }}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.botaoRemoverTexto}>×</Text>
      </Pressable>
    </View>
  );
}

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        // Aula 06 - key estável baseada no id, não no index
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item item={item} onDelete={onDelete} />}
        ListEmptyComponent={
          <Text style={styles.listaVaziaTexto}>{listaVazia}</Text>
        }
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Aula 04 - a lista ocupa o restante da tela
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1e293b',
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listaVaziaTexto: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemTextoContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTexto: {
    fontSize: 15,
    color: '#0f172a',
  },
  itemData: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  botaoRemover: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoRemoverPressionado: {
    opacity: 0.7,
  },
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
    fontWeight: '700',
  },
});
