import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { DESPESAS_INICIAIS } from './src/data/despesasIniciais';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import TodasDespesas from './src/screens/TodasDespesas';

const ABAS = [
  { chave: 'recentes', rotulo: 'Recentes' },
  { chave: 'todas', rotulo: 'Todas' },
];

export default function App() {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);
  const [aba, setAba] = useState('recentes');
  const [gerenciando, setGerenciando] = useState(false);
  const [despesaEditando, setDespesaEditando] = useState(null);

  function abrirNova() {
    setDespesaEditando(null);
    setGerenciando(true);
  }

  function abrirEdicao(id) {
    setDespesaEditando(despesas.find((despesa) => despesa.id === id));
    setGerenciando(true);
  }

  function fecharFormulario() {
    setGerenciando(false);
    setDespesaEditando(null);
  }

  function salvarDespesa(dados) {
    if (dados.id) {
      setDespesas((atuais) =>
        atuais.map((despesa) => (despesa.id === dados.id ? dados : despesa))
      );
    } else {
      const nova = { ...dados, id: Date.now().toString() };
      setDespesas((atuais) => [nova, ...atuais]);
    }
    fecharFormulario();
  }

  function excluirDespesa(id) {
    setDespesas((atuais) => atuais.filter((despesa) => despesa.id !== id));
    fecharFormulario();
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {gerenciando ? (
        <GerenciarDespesa
          despesaEditando={despesaEditando}
          onSalvar={salvarDespesa}
          onExcluir={excluirDespesa}
          onCancelar={fecharFormulario}
        />
      ) : (
        <>
          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Gerenciador de Despesas</Text>
            <Pressable style={styles.botaoAdicionar} onPress={abrirNova}>
              <Text style={styles.textoAdicionar}>+ Nova</Text>
            </Pressable>
          </View>

          <View style={styles.abas}>
            {ABAS.map((item) => (
              <Pressable
                key={item.chave}
                style={[styles.aba, aba === item.chave && styles.abaAtiva]}
                onPress={() => setAba(item.chave)}
              >
                <Text
                  style={[
                    styles.textoAba,
                    aba === item.chave && styles.textoAbaAtiva,
                  ]}
                >
                  {item.rotulo}
                </Text>
              </Pressable>
            ))}
          </View>

          {aba === 'recentes' ? (
            <DespesasRecentes despesas={despesas} onEditar={abrirEdicao} />
          ) : (
            <TodasDespesas despesas={despesas} onEditar={abrirEdicao} />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3fb',
    paddingTop: 56,
    paddingHorizontal: 16,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3e04c3',
  },
  botaoAdicionar: {
    backgroundColor: '#3e04c3',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },
  textoAdicionar: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  abas: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  aba: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#d9d9d9',
  },
  abaAtiva: {
    borderBottomColor: '#3e04c3',
  },
  textoAba: {
    color: '#666666',
  },
  textoAbaAtiva: {
    color: '#3e04c3',
    fontWeight: 'bold',
  },
});
