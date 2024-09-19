import { Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';

export const RESPONSAVEL_ROUTES: Routes = [
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'listar', component: ListarComponent },
];
