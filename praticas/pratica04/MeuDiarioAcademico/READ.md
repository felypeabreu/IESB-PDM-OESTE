# Meu Diário Acadêmico 

App em React Native (Expo) pra cadastrar as disciplinas do semestre. Feito pra treinar componentes básicos, import/export, StyleSheet e Flexbox.

## Como rodar

```bash
npm install
npx expo start
```

Aperta `w` pra abrir no navegador, ou escaneia o QR code com o Expo Go no celular.

## O que tem na tela

Título no topo, campo de texto + botão "Adicionar" lado a lado, um switch de "Mostrar apenas obrigatórias" (só visual por enquanto) e a lista de disciplinas embaixo. A lista é fixa mesmo, só pra treinar layout.

## Decisões de layout

- Input e botão na mesma linha com `flexDirection: 'row'`. O input tem largura em `%` e o botão usa `flex: 1` pra ocupar o resto do espaço.
- `justifyContent`/`alignItems` pra centralizar texto do botão e alinhar o switch.
- Lista com `flex: 1` pra ocupar o espaço restante da tela.
- `SafeAreaView` pra não ficar atrás da barra de status.

## Arquivos

- `App.js` — tela e estilos
- `labels.js` — textos separados (título, placeholder, botão etc.)

## Extra

Troquei o botão por `Pressable` (fica mais escuro quando pressionado) e adicionei o `Switch` de filtro, ainda sem filtrar de verdade.
