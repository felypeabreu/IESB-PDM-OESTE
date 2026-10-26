import * as Location from 'expo-location';

// Devolve { latitude, longitude, label } ou null se a permissão for negada.
export async function getCurrentPlace() {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) return null;

  const position = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;

  try {
    const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (address) {
      const street = [address.street, address.streetNumber].filter(Boolean).join(', ');
      const city = address.city || address.subregion;
      const text = [street, city].filter(Boolean).join(' - ');
      if (text) label = text;
    }
  } catch {
    // Sem endereço (comum em emulador): mantém as coordenadas.
  }

  return { latitude, longitude, label };
}
