import { Endereco } from './endereco';

export interface Responsavel {
  cpf: string;
  rg: string;
  nome: string;
  email: string;
  endereco: Endereco;
}
