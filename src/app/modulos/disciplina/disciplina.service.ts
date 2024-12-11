import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagina } from '../../model/pagina';
import { Disciplina } from '../../model/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private readonly API = '/api/disciplina';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Pagina<Disciplina>>(this.API);
  }

  save(record: Partial<Disciplina>) {
    console.log(record)
    return this.httpClient.post(this.API, record);
  }
}
