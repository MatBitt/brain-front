import { Injectable } from '@angular/core';
import { GrupoDisciplina } from '../../model/grupo-disciplina';
import { HttpClient } from '@angular/common/http';
import { Pagina } from '../../model/pagina';

@Injectable({
  providedIn: 'root'
})
export class GrupoDisciplinaService {
  private readonly API = '/api/grupo-disciplina';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Pagina<GrupoDisciplina>>(this.API);
  }

  save(record: Partial<GrupoDisciplina>) {
    return this.httpClient.post(this.API, record);
  }
}
