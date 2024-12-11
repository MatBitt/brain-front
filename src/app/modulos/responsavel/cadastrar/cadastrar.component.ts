import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  DateAdapter,
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EnderecoFormComponent } from '../../../shared/form/endereco-form/endereco-form.component';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { ProfessorService } from '../../professor/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from '../../../shared/form/form-utils.service';
import { rgValidator } from '../../../shared/validators/rg-validator.directive';
import { ResponsavelService } from '../responsavel.service';

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
    CommonModule,
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: ResponsavelService,
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
      rg: ['', [Validators.required, rgValidator]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      endereco: this.formBuilder.group({}),
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
    this.snackBar.open('Responsavel salvo com sucesso!', '', {
      duration: 5000,
    });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar responsavel.', '', { duration: 5000 });
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
