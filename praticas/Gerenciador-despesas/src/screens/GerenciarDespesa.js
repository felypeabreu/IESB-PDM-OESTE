import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { getDataFormatada } from '../util/datas';

// Aceita apenas números com no máximo duas casas decimais.
const REGEX_VALOR = /^\d*\.?\d{0,2}$/;

function GerenciarDespesa({ despesaEditando, onSalvar, onExcluir, onCancelar }) {
  const editando = !!despesaEditando;

  const [descricao, setDescricao] = useState(despesaEditando?.descricao ?? '');
  const [valor, setValor] = useState(
    despesaEditando ? despesaEditando.valor.toFixed(2) : ''
  );
  const [categoria, setCategoria] = useState(despesaEditando?.categoria ?? '');
  const [data, setData] = useState(despesaEditando?.data ?? new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [erros, setErros] = useState([]);

  function tratarValor(texto) {
    const textoNormalizado = texto.replace(',', '.');
    if (REGEX_VALOR.test(textoNormalizado)) {
      setValor(textoNormalizado);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    if (Platform.OS === 'android') {
      setMostrarCalendario(false);
    }
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function validar() {
    const mensagens = [];
    if (descricao.trim() === '') {
      mensagens.push('Informe a descrição.');
    }
    const valorNumerico = parseFloat(valor);
    if (valor === '' || isNaN(valorNumerico) || valorNumerico <= 0) {
      mensagens.push('Informe um valor maior que zero.');
    }
    if (categoria === '') {
      mensagens.push('Selecione uma categoria.');
    }
    return mensagens;
  }

  function aoSalvar() {
    const mensagens = validar();
    setErros(mensagens);
    if (mensagens.length > 0) {
      return;
    }
    onSalvar({
      id: despesaEditando?.id,
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      data,
      categoria,
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {editando ? 'Editar despesa' : 'Nova despesa'}
      </Text>

      <Text style={styles.rotulo}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex.: Almoço"
      />

      <Text style={styles.rotulo}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={tratarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.rotulo}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarCalendario(true)}>
        <Text>{getDataFormatada(data)}</Text>
      </Pressable>
      {mostrarCalendario && (
        <DateTimePicker
          value={data}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={aoMudarData}
        />
      )}
      {Platform.OS === 'ios' && mostrarCalendario && (
        <Pressable
          style={styles.botaoSecundario}
          onPress={() => setMostrarCalendario(false)}
        >
          <Text style={styles.textoBotaoSecundario}>Confirmar data</Text>
        </Pressable>
      )}

      <Text style={styles.rotulo}>Categoria</Text>
      <SeletorCategoria selecionada={categoria} onSelecionar={setCategoria} />

      {erros.length > 0 && (
        <View style={styles.caixaErros}>
          {erros.map((erro) => (
            <Text key={erro} style={styles.erro}>
              {erro}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.botoes}>
        <Pressable style={styles.botaoSecundario} onPress={onCancelar}>
          <Text style={styles.textoBotaoSecundario}>Cancelar</Text>
        </Pressable>
        <Pressable style={styles.botaoPrimario} onPress={aoSalvar}>
          <Text style={styles.textoBotaoPrimario}>
            {editando ? 'Atualizar' : 'Adicionar'}
          </Text>
        </Pressable>
      </View>

      {editando && (
        <Pressable
          style={styles.botaoExcluir}
          onPress={() => onExcluir(despesaEditando.id)}
        >
          <Text style={styles.textoBotaoExcluir}>Excluir despesa</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3e04c3',
    marginBottom: 12,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  caixaErros: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#fde8e8',
    borderRadius: 6,
  },
  erro: {
    color: '#b00020',
    fontSize: 13,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  botaoPrimario: {
    backgroundColor: '#3e04c3',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  textoBotaoPrimario: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  botaoSecundario: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 8,
  },
  textoBotaoSecundario: {
    color: '#333333',
    fontWeight: '600',
    textAlign: 'center',
  },
  botaoExcluir: {
    marginTop: 24,
    padding: 10,
    alignItems: 'center',
  },
  textoBotaoExcluir: {
    color: '#b00020',
    fontWeight: 'bold',
  },
});
