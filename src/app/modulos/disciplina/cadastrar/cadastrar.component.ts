import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { DisciplinaService } from '../../disciplina/disciplina.service';
import { Unidade } from '../../../model/unidade';
import { UnidadeService } from '../../unidade/unidade.service';
import { Serie } from '../../../model/serie';
import { GrupoDisciplina } from '../../../model/grupo-disciplina';
import { SerieService } from '../../serie/serie.service';
import { GrupoDisciplinaService } from '../../grupo-disciplina/grupo-disciplina.service';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent {
  form!: FormGroup;
  unidades: Unidade[] = [];
  series: Serie[] = [];
  grupos: GrupoDisciplina[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: DisciplinaService,
    private snackBar: MatSnackBar,
    private location: Location,
    public formUtils: FormUtilsService,
    public unidadeService: UnidadeService,
    public serieService: SerieService,
    public grupoDisciplinaService: GrupoDisciplinaService,
  ) {
  }

  ngOnInit(): void {
    this.unidadeService.list().subscribe({
      next: (data) => this.unidades = data,
      error: (err) => console.error('Erro ao buscar gêneros', err)
    });
    this.serieService.list().subscribe({
      next: (data) => this.series = data,
      error: (err) => console.error('Erro ao buscar gêneros', err)
    });
    this.grupoDisciplinaService.list().subscribe({
      next: (data) => this.grupos = data.content,
      error: (err) => console.error('Erro ao buscar gêneros', err)
    });
    this.form = this.formBuilder.group({
      unidadeId: [0, [Validators.required]],
      serieId: [0, [Validators.required]],
      grupoId: [0, [Validators.required]],
      nome: ['', [Validators.required]],
      cargaHoraria: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    console.log(this.form.value)
    // this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Disciplina salvo com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar disciplina.', '', { duration: 5000 });
  }
}
