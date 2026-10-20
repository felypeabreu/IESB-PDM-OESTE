import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DespesaSaida from '../components/despesa/DespesaSaida';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import { filtrarPorCategoria } from '../util/despesas';

function TodasDespesas({ despesas, onEditar }) {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);
  const periodo = categoriaFiltro ? `Total - ${categoriaFiltro}` : 'Total';

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
        mensagemVazia="Nenhuma despesa nesta categoria."
      />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
