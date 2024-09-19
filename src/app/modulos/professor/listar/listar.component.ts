import { Component } from '@angular/core';
import { Professor } from '../../../model/professor';
import { Pagina } from '../../../model/pagina';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProfessorService } from '../professor.service';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss',
})
export class ListarComponent {
  professores$: Observable<Pagina<Professor>>;

  displayedColumns: string[] = [
    'cpf',
    'rg',
    'matricula',
    'nome',
    'nomeSocial',
    'email',
    'emailProfissional',
    'logradouro',
    'carteiraDeTrabalho'
  ];

  constructor(public dialog: MatDialog, private service: ProfessorService) {
    this.professores$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar professores.');
        return of(); // TODO Retornar uma pagina vazia
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(MensagemErroComponent, {
      data: errorMsg,
    });
  }
}
