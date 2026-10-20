import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DespesaSaida from '../components/despesa/DespesaSaida';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { filtrarPorCategoria, filtrarRecentes } from '../util/despesas';

const DIAS_RECENTES = 7;

function DespesasRecentes({ despesas, onEditar }) {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const recentes = filtrarRecentes(despesas, DIAS_RECENTES);
  const despesasFiltradas = filtrarPorCategoria(recentes, categoriaFiltro);
  const periodo = categoriaFiltro
    ? `Últimos ${DIAS_RECENTES} dias - ${categoriaFiltro}`
    : `Últimos ${DIAS_RECENTES} dias`;

  return (
    <View style={styles.container}>
      <SeletorCategoria
        selecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
        incluirTodas
      />
      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={periodo}
        onPressItem={onEditar}
        mensagemVazia="Nenhuma despesa recente nesta categoria."
      />
    </View>
  );
}

export default DespesasRecentes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
