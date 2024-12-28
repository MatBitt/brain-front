import { Injectable } from '@angular/core';
import { Turma } from '../../model/turma';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TurmaService {
  private readonly API = '/api/turma';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Turma[]>(this.API);
  }

  save(record: Partial<Turma>) {
    return this.httpClient.post(this.API, record);
  }
}
