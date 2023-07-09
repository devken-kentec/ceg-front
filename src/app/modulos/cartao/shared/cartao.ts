export interface Cartao {
  id: number;
  codigo: number;
  validade: number;
  statusCartao: string;
  usuarioId: number;
  usuario: string;
  empresa: string;
}
