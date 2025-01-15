import { Injectable } from '@angular/core';
import { Horario } from '../../model/horario';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private readonly API = '/api/horario';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Horario[]>(this.API);
  }

  save(record: Partial<Horario>) {
    return this.httpClient.post(this.API, record);
  }
}
