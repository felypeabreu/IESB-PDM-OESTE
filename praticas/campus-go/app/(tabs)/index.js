import React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import FadeIn from '../../components/FadeIn';
import useNotices from '../../hooks/useNotices';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();

  // 1) Carregando pela primeira vez
  if (isLoading && notices.length === 0 && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3F51B5" />
        <Text style={styles.hint}>Carregando avisos...</Text>
      </View>
    );
  }

  // 2) Erro
  if (error && notices.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  // 3) Sucesso (puxar para baixo chama reload)
  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.hint}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 60} style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  hint: { fontSize: 15, color: '#666', textAlign: 'center' },
  error: { fontSize: 16, color: '#D32F2F', textAlign: 'center' },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, elevation: 2, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, textTransform: 'capitalize' },
  body: { fontSize: 14, color: '#444' },
});
