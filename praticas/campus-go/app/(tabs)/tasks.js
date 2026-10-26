import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const result = await getCurrentPlace();
      if (!result) {
        Alert.alert('Localização', 'Sem permissão de localização não dá para fazer o check-in.');
        return;
      }
      setPlace(result);
    } catch {
      Alert.alert('Localização', 'Não foi possível obter sua localização agora.');
    }
  }

  async function handleReminder() {
    try {
      const scheduled = await scheduleReminder('Hora de estudar!', 10);
      Alert.alert(
        scheduled ? 'Lembrete agendado' : 'Notificações',
        scheduled ? 'Você será avisado em 10 segundos.' : 'Sem permissão de notificação.'
      );
    } catch {
      Alert.alert('Notificações', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // Sem vibração (ex.: emulador): segue normalmente.
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tarefas</Text>

      <Link href="/new-task" style={styles.link}>
        Nova tarefa
      </Link>
      <Button title="Abrir tarefa 42" onPress={() => router.push('/task/42')} />

      <View style={styles.section}>
        <Button title="Estudei aqui" onPress={handleCheckIn} />
        {place && <Text style={styles.place}>📍 {place.label}</Text>}
      </View>

      <View style={styles.section}>
        <Button title="Lembrar em 10 s" onPress={handleReminder} />
        <Button title="Concluir" onPress={handleComplete} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  heading: { fontSize: 24, fontWeight: 'bold' },
  link: { fontSize: 18, color: '#3F51B5', paddingVertical: 8 },
  section: { gap: 10 },
  place: { fontSize: 16, marginTop: 4 },
});
