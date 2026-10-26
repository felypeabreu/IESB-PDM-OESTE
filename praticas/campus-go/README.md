# CampusGo

Atividade Prática da Aula 10 · PDM — Expo Router, recursos nativos e API.

## Como rodar

```bash
cp .env.example .env
npm install
npx expo install expo-router expo-linking expo-constants @react-native-async-storage/async-storage expo-image-picker expo-location expo-notifications expo-haptics
npx expo start
```

Reinicie o Expo sempre que alterar o `.env`.

## Estrutura

```
app/            rotas por arquivos (_layout, new-task, task/[id], (tabs)/...)
components/     FadeIn
hooks/          useNotices
services/       api, media, location, notifications
store/          expenses-context (copiado da Aula 09)
```

## Descrição do PR

```
Nome: <seu nome>
Matrícula: <sua matrícula>
Tarefas concluídas: 1, 2, 3, 4, 5
Bônus: nenhum
```
