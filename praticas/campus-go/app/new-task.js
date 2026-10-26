import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function NewTask() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.text}>Esta tela abre como modal.</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  text: { fontSize: 16 },
});
