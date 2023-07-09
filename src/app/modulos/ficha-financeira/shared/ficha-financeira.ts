export interface FichaFinanceira {
  id: number;
  empresaId: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  dataGeracao: string;
  dia: number;
  valorMensal: number;
  statusFichaFinanceira: string;
}
