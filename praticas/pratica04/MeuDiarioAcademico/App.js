import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  BUTTON_TEXT,
  LIST_TITLE,
  SWITCH_LABEL,
} from './labels';

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Estrutura de Dados',
  'Engenharia de Software',
  'Banco de Dados II',
];

export default function App() {
  const [apenasObrigatorias, setApenasObrigatorias] = useState(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>{APP_TITLE}</Text>

        <View style={styles.formRow}>
          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
            placeholderTextColor="#888"
          />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>{BUTTON_TEXT}</Text>
          </Pressable>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{SWITCH_LABEL}</Text>
          <Switch
            value={apenasObrigatorias}
            onValueChange={setApenasObrigatorias}
          />
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>
        <View style={styles.list}>
          {disciplinas.map((disciplina, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.itemText}>{disciplina}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F7',
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },

  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    marginRight: '2%',
    fontSize: 16,
  },

  button: {
    flex: 1,
    backgroundColor: '#3D5AFE',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    backgroundColor: '#2A3EB1',
    opacity: 0.85,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  switchLabel: {
    fontSize: 14,
    color: '#444',
  },

  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  list: {
    flex: 1,
  },

  item: {
    backgroundColor: '#FFF',
    padding: 14,
    margin: 6,
    marginLeft: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },

  itemText: {
    fontSize: 15,
    color: '#333',
  },
});