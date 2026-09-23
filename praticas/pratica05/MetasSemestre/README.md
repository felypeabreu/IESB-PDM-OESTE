# MetasSemestre 📚

Um app simples pra você anotar as metas de estudo do semestre, remover o que já
não faz mais sentido, os dados não somem quando você fecha o app.
Tudo fica salvo no celular

## Como colocar pra rodar

Primeiro, cria o projeto com o Expo:

```bash
npx create-expo-app@latest MetasSemestre --template blank
cd MetasSemestre
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

Depois, pega os arquivos `App.js` e a pasta `components/` (com `MetaInput.js`,
`MetaList.js` e `MetaItem.js`) e coloca dentro dessa pasta que o Expo acabou de
criar, substituindo o `App.js` padrão. A estrutura final tem que ficar assim:

```
MetasSemestre/
├── App.js
└── components/
    ├── MetaInput.js
    ├── MetaList.js
    └── MetaItem.js
```

Um detalhe que costuma pegar todo mundo: a pasta `components` precisa estar
dentro de `MetasSemestre`, no mesmo nível do `App.js` — não do lado de fora,
não numa pasta pai. Se o Metro reclamar de "Unable to resolve", é quase sempre
isso.

Pra rodar de verdade:

```bash

npx expo start

```


## Como o app funciona por dentro

A ideia central é bem direta: existe um estado `metas` guardando a lista, e
toda vez que ele muda (adiciona ou remove algo), um `useEffect` salva essa
lista inteira no AsyncStorage como uma string JSON. Quando o app abre de novo,
outro `useEffect` lê essa string, transforma de volta em array com
`JSON.parse` e recoloca no estado.

Tem um detalhezinho ali no meio que é fácil de passar batido: eu criei um
estado extra chamado `carregando`. Ele existe porque, sem ele, o app tentaria
salvar a lista *antes* de terminar de carregar os dados do AsyncStorage — e
como nesse momento a lista ainda está vazia (`[]`), ele acabaria sobrescrevendo
tudo que você já tinha salvo. O `carregando` só libera o salvamento depois que
o carregamento inicial termina.

Cada meta que você cadastra vira um objetinho assim:


O `id` usa `Date.now()` só porque é simples e, na prática, nunca vai repetir
entre dois cliques.

Sobre os componentes: dividi em três pra não deixar tudo empilhado num arquivo
só. O `MetaInput` cuida só do campo de texto e do botão de adicionar. O
`MetaList` é quem monta a `FlatList` (lista rolável, melhor que `ScrollView`
pra listas que podem crescer). E o `MetaItem` é cada linha individual, com o
botão de remover — separei ele do `MetaList` porque fica mais fácil de mexer
no visual de um item sem bagunçar a lógica da lista inteira.gi
