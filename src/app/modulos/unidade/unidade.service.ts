import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagina } from '../../model/pagina';
import { Unidade } from '../../model/unidade';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  private readonly API = '/api/unidade';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Unidade[]>(this.API);
  }

  save(record: Partial<Unidade>) {
    return this.httpClient.post(this.API, record);
  }
}
