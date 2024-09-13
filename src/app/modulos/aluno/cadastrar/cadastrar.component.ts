import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AlunoService } from '../aluno.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { Aluno } from '../../../model/aluno';
import { Genero } from '../../../enum/genero.enum';

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
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: AlunoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cpf: [
        '12345678901',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      nome: ['Paulo', [Validators.required]],
      nomeSocial: ['Paulinho'],
      email: ['Paulo@gmail.com', [Validators.required]],
      dataDeNascimento: ['2024-12-12', [Validators.required]],
      endereco: this.formBuilder.group({
        logradouro: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        complemento: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        uf: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
      }),
      genero: ['Masculino', [Validators.required]],
      corRaca: ['Branco', [Validators.required]],
      cidadeNaturalidade: ['Brasilia', [Validators.required]],
      rg: ['2345678', [Validators.required]],
      tipoSanguineo: ['B-', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
    // if (this.form.valid) {
    // } else {
    //   this.formUtils.validateAllFormFields(this.form);
    // }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Aluno salvo com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar aluno.', '', { duration: 5000 });
  }
}
