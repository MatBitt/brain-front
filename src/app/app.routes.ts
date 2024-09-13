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
];
