import { Component } from '@angular/core';
import { Disciplina } from '../../../model/disciplina';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Observable, catchError, of } from 'rxjs';
import { Pagina } from '../../../model/pagina';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';
import { DisciplinaService } from '../disciplina.service';

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
  disciplinas$: Observable<Pagina<Disciplina>>;

  displayedColumns: string[] = [
    'nome',
    'cargaHoraria',
    'grupo',
    'serie',
    'unidade',
  ];

  constructor(public dialog: MatDialog, private service: DisciplinaService) {
    this.disciplinas$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar disciplinas.');
        return of();
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(MensagemErroComponent, {
      data: errorMsg,
    });
  }
}
