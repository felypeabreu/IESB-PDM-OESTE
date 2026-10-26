import React, { useState } from 'react';
import { Alert, Button, FlatList, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function Wallet() {
  const { expenses, addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  function handleAdd() {
    const value = parseFloat(amount.replace(',', '.'));
    if (description.trim().length < 3 || Number.isNaN(value) || value <= 0) {
      Alert.alert('Despesa inválida', 'Informe uma descrição (mín. 3 letras) e um valor maior que zero.');
      return;
    }
    addExpense({ description: description.trim(), amount: value, date: new Date(), category: 'Outros' });
    setDescription('');
    setAmount('');
  }

  async function handleShare() {
    try {
      await Share.share({ message: `Gastei R$ ${total.toFixed(2)} neste semestre.` });
    } catch {
      Alert.alert('Compartilhar', 'Não foi possível abrir o menu de compartilhamento.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      <Button title="Compartilhar resumo" onPress={handleShare} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor (ex.: 12.50)"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Adicionar despesa" onPress={handleAdd} />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma despesa ainda.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.description}</Text>
            <Text style={styles.rowText}>R$ {item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  label: { fontSize: 14, color: '#666' },
  total: { fontSize: 36, fontWeight: 'bold', color: '#3F51B5' },
  form: { gap: 8, marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#fff' },
  empty: { textAlign: 'center', color: '#666', marginTop: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ccc' },
  rowText: { fontSize: 16 },
});
