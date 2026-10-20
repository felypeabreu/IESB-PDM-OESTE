// App.js
// Aula 02 - Estrutura do projeto Expo (template blank)
// Aula 03 - Import/Export, Core Components, StyleSheet
// Aula 04 - Layout com Flexbox
// Aula 05 - useState, props e componentização
// Aula 06 - Pressable, useEffect, AsyncStorage e persistência com JSON

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import * as labels from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Aula 06 - useEffect de MONTAGEM: carrega os dados salvos
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const salvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvos !== null) {
          setCompromissos(JSON.parse(salvos));
        }
      } catch (erro) {
        console.log('Erro ao carregar:', erro);
        Alert.alert('Erro', labels.erroCarregar);
      } finally {
        setCarregado(true);
      }
    }
    carregarCompromissos();
  }, []);

  // Aula 06 - useEffect com DEPENDÊNCIA na lista: salva a cada alteração
  useEffect(() => {
    // Evita sobrescrever o storage com [] antes do carregamento inicial terminar
    if (!carregado) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        console.log('Erro ao salvar:', erro);
        Alert.alert('Erro', labels.erroSalvar);
      }
    }
    salvarCompromissos();
  }, [compromissos, carregado]);

  function handleAdicionar() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert(labels.alertaTituloVazio, labels.alertaMensagemVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(), // Aula 06 - identificador único
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    // Aula 05 - novo array (imutabilidade), nunca mutar com push
    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  function handleRemover(id) {
    // Aula 06 - remoção com filter, por id (não por index)
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  const pendentes = compromissos.length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Cabeçalho - Aula 04: flexDirection 'row' */}
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <View style={styles.headerTextos}>
              <Text style={styles.tituloApp}>{labels.tituloApp}</Text>
              <Text style={styles.subtituloApp}>{labels.subtituloApp}</Text>
            </View>
            <View style={styles.contadorBadge}>
              <Text style={styles.contadorTexto}>{pendentes}</Text>
            </View>
          </View>

          {/* Formulário - componente filho com props */}
          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={handleAdicionar}
            labels={labels}
          />

          {/* Lista - componente filho com props, flex: 1 */}
          <CompromissoList
            itens={compromissos}
            onDelete={handleRemover}
            tituloLista={labels.tituloLista}
            listaVazia={labels.listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerTextos: {
    flex: 1, // Aula 04 - ocupa o espaço restante entre logo e badge
  },
  tituloApp: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
  },
  subtituloApp: {
    fontSize: 12,
    color: '#64748b',
  },
  contadorBadge: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e40af',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  contadorTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
});
