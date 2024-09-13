import { Endereco } from './endereco';

export interface Aluno {
  cpf: string;
  nome: string;
  nomeSocial: string;
  email: string;
  emailEscolar: string;
  endereco: Endereco;
  dataDeNascimento: string;
  genero: string;
  corRaca: string;
  cidadeNaturalidade: string;
  rg: string;
  matricula: string;
  tipoSanguineo: string;
}
