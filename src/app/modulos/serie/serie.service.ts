import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagina } from '../../model/pagina';
import { Serie } from '../../model/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private readonly API = '/api/serie';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Pagina<Serie>>(this.API);
  }

  save(record: Partial<Serie>) {
    return this.httpClient.post(this.API, record);
  }
}
