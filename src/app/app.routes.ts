import { Routes } from '@angular/router';
import { HomeComponent } from './modulos/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'aluno',
    loadChildren: () =>
      import('./modulos/aluno/aluno.routes').then((m) => m.ALUNO_ROUTES),
  },
  {
    path: 'professor',
    loadChildren: () =>
      import('./modulos/professor/professor.routes').then(
        (m) => m.PROFESSOR_ROUTES
      ),
  },
  {
    path: 'responsavel',
    loadChildren: () =>
      import('./modulos/responsavel/responsavel.routes').then(
        (m) => m.RESPONSAVEL_ROUTES
      ),
  },
  {
    path: 'disciplina',
    loadChildren: () =>
      import('./modulos/disciplina/disciplina.routes').then(
        (m) => m.DISCIPLINA_ROUTES
      ),
  },
  {
    path: 'grupo-disciplina',
    loadChildren: () =>
      import('./modulos/grupo-disciplina/grupo-disciplina.routes').then(
        (m) => m.GRUPO_DISCIPLINA_ROUTES
      ),
  },
  {
    path: 'serie',
    loadChildren: () =>
      import('./modulos/serie/serie.routes').then(
        (m) => m.SERIE_ROUTES
      ),
  },
  {
    path: 'unidade',
    loadChildren: () =>
      import('./modulos/unidade/unidade.routes').then(
        (m) => m.UNIDADE_ROUTES
      ),
  },
  {
    path: 'turma',
    loadChildren: () =>
      import('./modulos/turma/turma.routes').then(
        (m) => m.TURMA_ROUTES
      ),
  },
  {
    path: 'aula',
    loadChildren: () =>
      import('./modulos/aula/aula.routes').then(
        (m) => m.AULA_ROUTES
      ),
  },
];
