import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfessorService } from '../professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { DatePipe, Location } from '@angular/common';
import { DateAdapter, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
    EnderecoFormComponent,
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ProfessorService,
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
      carteiraDeTrabalho: ['', [Validators.required]],
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
    this.snackBar.open('Professor salvo com sucesso!', '', { duration: 5000 });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar professor.', '', { duration: 5000 });
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
