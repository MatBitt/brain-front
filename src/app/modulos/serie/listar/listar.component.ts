import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { catchError, Observable, of } from 'rxjs';
import { Pagina } from '../../../model/pagina';
import { Serie } from '../../../model/serie';
import { SerieService } from '../serie.service';
import { MatDialog } from '@angular/material/dialog';
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
  series$: Observable<Serie[]>;

  displayedColumns: string[] = ['id', 'nome'];

  constructor(public dialog: MatDialog, private service: SerieService) {
    this.series$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar series.');
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
