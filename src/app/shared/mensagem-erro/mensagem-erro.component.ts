import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mensagem-erro',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './mensagem-erro.component.html',
  styleUrl: './mensagem-erro.component.scss',
})
export class MensagemErroComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
