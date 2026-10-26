import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TABS = [
  { name: 'index', title: 'Início', icon: 'home-outline' },
  { name: 'tasks', title: 'Tarefas', icon: 'checkbox-outline' },
  { name: 'wallet', title: 'Bolso', icon: 'wallet-outline' },
  { name: 'profile', title: 'Perfil', icon: 'person-outline' },
];

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#3F51B5' }}>
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
