import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PICKER_OPTIONS = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [1, 1],
  quality: 0.7,
};

// Abre a galeria. Devolve a URI da imagem ou null se o usuário cancelar.
export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);
  if (result.canceled) return null;
  return result.assets[0].uri;
}

// Pede permissão da câmera antes de abrir. Se negada, oferece abrir os ajustes.
export async function takePhoto() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permissão da câmera',
      'Sem acesso à câmera não dá para tirar a foto. Você pode liberar nos ajustes.',
      [
        { text: 'Agora não', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync(PICKER_OPTIONS);
  if (result.canceled) return null;
  return result.assets[0].uri;
}
