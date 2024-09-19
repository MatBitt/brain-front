import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagina } from '../../model/pagina';
import { Professor } from '../../model/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private readonly API = '/api/professor';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Pagina<Professor>>(this.API);
  }

  save(record: Partial<Professor>) {
    return this.httpClient.post(this.API, record);
  }
}
