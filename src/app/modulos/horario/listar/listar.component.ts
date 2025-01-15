import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { catchError, Observable, of } from 'rxjs';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';
import { HorarioService } from '../horario.service';
import { Horario } from '../../../model/horario';

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
horarios$: Observable<Horario[]>;

  displayedColumns: string[] = ['id', 'nome'];

  constructor(public dialog: MatDialog, private service: HorarioService) {
    this.horarios$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar horarios.');
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
