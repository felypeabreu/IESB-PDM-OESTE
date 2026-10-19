import { getDataMenosDias } from './datas';

export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Tarefa 3: devolve apenas as despesas da categoria selecionada.
// Categoria vazia significa "sem filtro" (todas as despesas).
export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

// Despesas dos últimos `dias` dias (usado na tela de despesas recentes).
export function filtrarRecentes(despesas, dias = 7) {
  const limite = getDataMenosDias(new Date(), dias);
  return despesas.filter((despesa) => despesa.data >= limite);
}
