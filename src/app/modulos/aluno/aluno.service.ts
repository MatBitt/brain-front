import { Injectable } from '@angular/core';
import { Aluno } from '../../model/aluno';
import { HttpClient } from '@angular/common/http';
import { Pagina } from '../../model/pagina';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private readonly API = 'api/aluno';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Pagina<Aluno>>(this.API);
  }

  save(record: Partial<Aluno>) {
    return this.httpClient.post(this.API, record);
  }
}
