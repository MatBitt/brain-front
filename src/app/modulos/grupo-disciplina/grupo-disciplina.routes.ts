import { Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';

export const GRUPO_DISCIPLINA_ROUTES: Routes = [
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'listar', component: ListarComponent },
];
