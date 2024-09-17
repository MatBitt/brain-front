import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.scss',
})
export class EnderecoFormComponent implements OnInit {
  @Output() enderecoChange = new EventEmitter<FormGroup>();
  enderecoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enderecoForm = this.fb.group({
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern('[0-9]{5}-[0-9]{3}')]],
      complemento: [''],
      numero: ['', Validators.required],
      uf: ['', [Validators.required, Validators.maxLength(2)]],
      cidade: ['', Validators.required],
    });

    this.enderecoForm.valueChanges.subscribe(() => {
      this.enderecoChange.emit(this.enderecoForm);
    });
  }
}
