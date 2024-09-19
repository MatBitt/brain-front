import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { EnderecoFormComponent } from '../../../shared/form/endereco-form/endereco-form.component';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
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
    MatDatepickerModule,
    EnderecoFormComponent
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AlunoService,
    private snackBar: MatSnackBar,
    private location: Location,
    public formUtils: FormUtilsService,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      nome: ['', [Validators.required]],
      nomeSocial: [''],
      email: ['', [Validators.required]],
      dataDeNascimento: ['', [Validators.required]],
      endereco: this.formBuilder.group({}),
      genero: ['', [Validators.required]],
      corRaca: ['', [Validators.required]],
      cidadeNaturalidade: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      tipoSanguineo: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const date = this.atualizaData();
    console.log(this.form.value);
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
    this.form.patchValue({ dataDeNascimento: date });
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

  atualizaData() {
    const date = this.form.get('dataDeNascimento')?.value;
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.form.patchValue({ dataDeNascimento: formattedDate });
    return date;
  }

  onEnderecoChange(enderecoForm: FormGroup): void {
    this.form.setControl('endereco', enderecoForm); // Atualiza o form principal com o endereço
  }
}
