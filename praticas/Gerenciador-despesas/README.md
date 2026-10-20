# Gerenciador de Despesas

Atividade prática de React Native (Expo): expansão do gerenciador de despesas com **categorias** e **filtro dinâmico**.

## Como executar

```bash
npm install
npx expo install --check   # alinha as versões das dependências com a versão do Expo
npx expo start
```

## Estrutura

```
src/
├── components/despesa/
│   ├── DespesaItem.js        # item com data, descrição, valor e tag da categoria
│   ├── DespesaLista.js       # FlatList com keyExtractor
│   ├── DespesaSaida.js       # sumário + lista (recebe a lista já filtrada)
│   ├── DespesaSumario.js     # soma com .reduce(); vermelho acima de R$ 200,00
│   └── SeletorCategoria.js   # botões Pressable (formulário e filtro)
├── screens/
│   ├── TodasDespesas.js
│   ├── DespesasRecentes.js
│   └── GerenciarDespesa.js   # formulário: useState, regex, DateTimePicker, validação
├── util/
│   ├── datas.js              # getDataFormatada, getDataMenosDias
│   └── despesas.js           # CATEGORIAS, filtrarPorCategoria (.filter), filtrarRecentes
└── data/despesasIniciais.js
```

## Requisitos atendidos

- **Categoria:** campo `categoria` nas despesas e `useState` próprio em `GerenciarDespesa.js`, com seleção por `Pressable`.
- **Formulário:** regex `/^\d*\.?\d{0,2}$/` (duas casas decimais), `keyboardType="decimal-pad"`, `@react-native-community/datetimepicker` e validação de descrição, valor e categoria antes de salvar.
- **DespesaItem:** exibe categoria (tag cinza arredondada), data via `getDataFormatada`, descrição e valor.
- **DespesaSumario:** `somaDespesas` com `.reduce()` e `R$ ` + `.toFixed(2)`.
- **Filtro:** `filtrarPorCategoria` usa `.filter()`; a lista filtrada vai para `DespesaSaida`, e lista e sumário se atualizam juntos.
- **Bônus:** valor do sumário em vermelho quando a soma passa de R$ 200,00.
