import { Endereco } from './endereco';

export interface Professor {
  cpf: string;
  nome: string;
  nomeSocial: string;
  email: string;
  emailProfissional: string;
  endereco: Endereco;
  dataDeNascimento: string;
  genero: string;
  corRaca: string;
  cidadeNaturalidade: string;
  rg: string;
  matricula: string;
  tipoSanguineo: string;
  carteiraDeTrabalho: string;
}
