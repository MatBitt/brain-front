import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Observable, catchError, of } from 'rxjs';
import { Pagina } from '../../../model/pagina';
import { Unidade } from '../../../model/unidade';
import { MensagemErroComponent } from '../../../shared/mensagem-erro/mensagem-erro.component';
import { UnidadeService } from '../../unidade/unidade.service';

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
  unidades$: Observable<Pagina<Unidade>>;

  displayedColumns: string[] = ['id', 'nome'];

  constructor(public dialog: MatDialog, private service: UnidadeService) {
    this.unidades$ = this.service.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar unidades.');
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
