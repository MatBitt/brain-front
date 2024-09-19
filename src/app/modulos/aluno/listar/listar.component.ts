import { Pagina } from './../../../model/pagina';
import { AlunoService } from './../aluno.service';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Aluno } from '../../../model/aluno';
import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';

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
  alunos$: Observable<Pagina<Aluno>>;

  displayedColumns: string[] = [
    'cpf',
    'rg',
    'matricula',
    'nome',
    'nomeSocial',
    'email',
    'emailEscolar',
    'tipoSanguineo',
    'logradouro'];

  constructor(public dialog: MatDialog, private service: AlunoService) {
    this.alunos$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar alunos.');
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
