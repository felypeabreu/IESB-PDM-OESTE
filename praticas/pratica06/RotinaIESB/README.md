# RotinaIESB

Organizador simples da rotina acadêmica do aluno do IESB. Permite cadastrar
compromissos (aula, estudo, trabalho, lazer), visualizar a lista, remover
itens e manter os dados salvos mesmo após fechar o app.

Atividade Integradora — Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB

## 1) Comando usado para criar o projeto

```bash
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

Para rodar o projeto:

```bash
npx expo start
```

> Observação: se as versões de `expo`, `react-native` ou das libs instaladas
> pelo `npx expo install` ficarem diferentes das deste `package.json`, rode
> `npx expo install --fix` para alinhar automaticamente com o SDK do projeto.

## 2) Prints

Adicione aqui os prints solicitados pela atividade:

- **Tela vazia** (`printcap: tela-vazia.png`) — app recém aberto, sem
  compromissos cadastrados, mostrando a mensagem de lista vazia.
- **Tela com itens** (`printcap: tela-com-itens.png`) — dois ou mais
  compromissos cadastrados.
- **Após reabrir o app** (`printcap: apos-reabrir.png`) — app fechado e
  reaberto, mostrando que os itens cadastrados anteriormente continuam na
  lista (prova da persistência com AsyncStorage).

*(Substitua os placeholders acima pelas imagens reais capturadas no
emulador ou no Expo Go antes da entrega.)*

## 3) Mapa dos useEffect (carga e salvamento)

Ambos estão em `App.js`:

- **useEffect de carga** (linha ~26, logo após a declaração dos estados):
  roda uma única vez na montagem do componente (array de dependências
  `[]`), lê o AsyncStorage na chave `@rotina_iesb_compromissos` e faz
  `JSON.parse` para popular o estado `compromissos`.

- **useEffect de salvamento** (linha ~42, logo depois do de carga): tem
  `[compromissos, carregado]` como dependências, então roda toda vez que a
  lista muda. Ele faz `JSON.stringify(compromissos)` e grava no
  AsyncStorage na mesma chave. Uma flag `carregado` evita que ele
  sobrescreva o storage com uma lista vazia antes do primeiro carregamento
  terminar.

## 4) Arquivos criados

- `labels.js` — rótulos/textos da interface, exportados de forma nomeada.
- `components/CompromissoInput.js` — campo de texto + botão de adicionar
  (recebe `value`, `onChangeText`, `onAdd`, `labels` via props).
- `components/CompromissoList.js` — lista de compromissos com `FlatList`
  (recebe `itens`, `onDelete`, `tituloLista`, `listaVazia` via props).

## Estrutura do projeto

```
RotinaIESB/
  App.js
  labels.js
  assets/
    logo.png
  components/
    CompromissoInput.js
    CompromissoList.js
  package.json
  app.json
  README.md
```

## Funcionalidades

- Cadastro de compromissos com validação (não permite texto vazio).
- Remoção de compromissos por toque (Pressable + `filter` por `id`).
- Persistência local com `AsyncStorage` (`useEffect` de carga e de
  salvamento), usando `JSON.stringify` / `JSON.parse`.
- Layout com Flexbox: cabeçalho em linha (logo + título + contador),
  formulário em linha (input ~68% + botão ~28%), lista com `flex: 1`.
- `SafeAreaProvider` / `SafeAreaView` de `react-native-safe-area-context`.
- `android_ripple` nos botões (feedback de toque no Android).

## Como entregar (Git)

```bash
git checkout -b feature/atividade03
git add .
git commit -m "Atividade Integradora - RotinaIESB"
git push origin feature/atividade03
```

Depois, abra o Pull Request e cole o link na entrega, conforme pedido no
enunciado (sem `node_modules` e sem `.expo`).
