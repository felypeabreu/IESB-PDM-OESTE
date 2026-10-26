import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function Profile() {
  const [photoUri, setPhotoUri] = useState(null);

  // Relê a foto salva quando a tela abre.
  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) setPhotoUri(saved);
      } catch {
        // Sem foto salva: mostra o avatar padrão.
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch {
      Alert.alert('Perfil', 'Não foi possível salvar a foto.');
    }
  }

  async function handlePick() {
    try {
      await savePhoto(await pickImage());
    } catch {
      Alert.alert('Galeria', 'Não foi possível abrir a galeria.');
    }
  }

  async function handleTake() {
    try {
      await savePhoto(await takePhoto());
    } catch {
      Alert.alert('Câmera', 'Não foi possível abrir a câmera.');
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePick} accessibilityLabel="Trocar foto de perfil">
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Toque para escolher</Text>
          </View>
        )}
      </Pressable>
      <Text style={styles.name}>Aluno CampusGo</Text>
      <Button title="Tirar foto" onPress={handleTake} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 },
  avatar: { width: 140, height: 140, borderRadius: 70 },
  placeholder: { backgroundColor: '#D9DEE8', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#555', textAlign: 'center', paddingHorizontal: 12 },
  name: { fontSize: 20, fontWeight: 'bold' },
});
