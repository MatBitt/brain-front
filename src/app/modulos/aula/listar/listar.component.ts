import { Component } from '@angular/core';
import { Aula } from '../../../model/aula';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Observable, catchError, of } from 'rxjs';
import { Pagina } from '../../../model/pagina';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';
import { AulaService } from '../aula.service';

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
  aulas$: Observable<Pagina<Aula>>;

  displayedColumns: string[] = [
    'disciplina',
    'professor',
    'turma',
    'horario',
  ];

  constructor(public dialog: MatDialog, private service: AulaService) {
    this.aulas$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar aulas.');
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
