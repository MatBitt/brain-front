import { Disciplina } from './../../../model/disciplina';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Turma } from '../../../model/turma';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { DisciplinaService } from '../../disciplina/disciplina.service';
import { AulaService } from '../aula.service';
import { Professor } from '../../../model/professor';
import { ProfessorService } from '../../professor/professor.service';
import { TurmaService } from '../../turma/turma.service';
import { SerieService } from '../../serie/serie.service';
import { HorarioService } from '../../horario/horario.service';
import { Horario } from '../../../model/horario';

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
    CommonModule,
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent {
  form!: FormGroup;
  disciplinas: Disciplina[] = [];
  professores: Professor[] = [];
  turmas: Turma[] = [];
  horarios: Horario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: AulaService,
    private snackBar: MatSnackBar,
    public formUtils: FormUtilsService,
    public disciplinaService: DisciplinaService,
    public professorService: ProfessorService,
    public turmaService: TurmaService,
    public serieService: SerieService,
    public horarioService: HorarioService,
  ) {}

  ngOnInit(): void {
    this.disciplinaService.list().subscribe({
      next: (data) => (this.disciplinas = data.content),
      error: (err) => console.error('Erro ao buscar disciplinas', err),
    });
    this.turmaService.list().subscribe({
      next: (data) => (this.turmas = data),
      error: (err) => console.error('Erro ao buscar turmas', err),
    });
    this.professorService.list().subscribe({
      next: (data) => (this.professores = data.content),
      error: (err) => console.error('Erro ao buscar professores', err),
    });
    this.horarioService.list().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error('Erro ao buscar gêneros', err)
    });
    this.form = this.formBuilder.group({
      disciplinaId: [0, [Validators.required]],
      turma: [0, [Validators.required]],
      professorId: [0, [Validators.required]],
      horarioId: [0, [Validators.required]],
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  onCancel() {
    console.log(this.form.value);
    // this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Aula salvo com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar aula.', '', { duration: 5000 });
  }
}
