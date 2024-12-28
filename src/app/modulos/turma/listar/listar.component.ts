import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { catchError, Observable, of } from 'rxjs';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';
import { TurmaService } from '../turma.service';
import { Turma } from '../../../model/turma';

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
  styleUrl: './listar.component.scss'
})
export class ListarComponent {
turmas$: Observable<Turma[]>;

  displayedColumns: string[] = ['id', 'nome'];

  constructor(public dialog: MatDialog, private service: TurmaService) {
    this.turmas$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar turmas.');
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
