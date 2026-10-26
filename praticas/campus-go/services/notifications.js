import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Como a notificação aparece com o app aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function ensureChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}

async function ensurePermission() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

// Agenda uma notificação LOCAL (não é push). Devolve true se foi agendada.
export async function scheduleReminder(title, seconds) {
  await ensureChannel();

  if (!(await ensurePermission())) return false;

  await Notifications.scheduleNotificationAsync({
    content: { title, body: 'Lembrete do CampusGo' },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: 'default',
    },
  });
  return true;
}
