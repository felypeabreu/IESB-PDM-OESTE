import { FlatList } from 'react-native';

import DespesaItem from './DespesaItem';

function DespesaLista({ despesas, onPressItem }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem
          id={item.id}
          descricao={item.descricao}
          valor={item.valor}
          data={item.data}
          categoria={item.categoria}
          onPress={onPressItem}
        />
      )}
    />
  );
}

export default DespesaLista;
