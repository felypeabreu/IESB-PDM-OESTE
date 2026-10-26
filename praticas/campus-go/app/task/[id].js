import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function TaskDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefa número {id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
});
