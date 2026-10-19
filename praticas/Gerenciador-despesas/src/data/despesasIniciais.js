import { getDataMenosDias } from '../util/datas';

const hoje = new Date();

export const DESPESAS_INICIAIS = [
  {
    id: 'd1',
    descricao: 'Almoço no restaurante',
    valor: 35.9,
    data: getDataMenosDias(hoje, 1),
    categoria: 'Alimentação',
  },
  {
    id: 'd2',
    descricao: 'Passagem de ônibus',
    valor: 12.5,
    data: getDataMenosDias(hoje, 2),
    categoria: 'Transporte',
  },
  {
    id: 'd3',
    descricao: 'Cinema',
    valor: 48,
    data: getDataMenosDias(hoje, 4),
    categoria: 'Lazer',
  },
  {
    id: 'd4',
    descricao: 'Conta de energia',
    valor: 120.75,
    data: getDataMenosDias(hoje, 6),
    categoria: 'Contas',
  },
  {
    id: 'd5',
    descricao: 'Supermercado',
    valor: 89.3,
    data: getDataMenosDias(hoje, 12),
    categoria: 'Alimentação',
  },
  {
    id: 'd6',
    descricao: 'Aplicativo de transporte',
    valor: 27.4,
    data: getDataMenosDias(hoje, 20),
    categoria: 'Transporte',
  },
];
