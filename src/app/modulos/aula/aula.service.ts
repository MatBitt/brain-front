import { Injectable } from '@angular/core';
import { Aula } from '../../model/aula';
import { Pagina } from '../../model/pagina';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AulaService {
  private readonly API = '/api/aula';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Pagina<Aula>>(this.API);
  }

  save(record: Partial<Aula>) {
    console.log(record)
    return this.httpClient.post(this.API, record);
  }
}
