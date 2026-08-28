import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Programação para Dispositivos Móveis</Text>
      <Text>Olá, [Seu Nome]!</Text>
      <Text>Meu segundo passo com Expo e React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { View, Text } from 'react-native';
