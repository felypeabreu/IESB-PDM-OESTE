import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.log('Erro ao carregar metas:', erro);
        Alert.alert(
          'Erro ao carregar',
          'Não foi possível carregar suas metas salvas. Tente novamente.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);

  useEffect(() => {
    if (carregando) return;

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        console.log('Erro ao salvar metas:', erro);
        Alert.alert(
          'Erro ao salvar',
          'Não foi possível salvar suas metas. Suas alterações podem se perder.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregando]);

  function adicionarMeta() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Campo vazio', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
    };

    setMetas((atual) => [novaMeta, ...atual]);
    setTexto('');
  }

  function removerMeta(id) {
    setMetas((atual) => atual.filter((meta) => meta.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.subtitulo}>
              {metas.length === 0
                ? 'Nenhuma meta ainda'
                : `${metas.length} meta${metas.length > 1 ? 's' : ''} cadastrada${
                    metas.length > 1 ? 's' : ''
                  }`}
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={adicionarMeta} />

        <MetaList metas={metas} onDelete={removerMeta} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#4a47a3',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitulo: {
    fontSize: 13,
    color: '#e0dffc',
    marginTop: 2,
  },
});