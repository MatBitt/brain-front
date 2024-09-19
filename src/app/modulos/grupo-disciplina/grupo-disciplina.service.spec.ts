import { TestBed } from '@angular/core/testing';

import { GrupoDisciplinaService } from './grupo-disciplina.service';

describe('GrupoDisciplinaService', () => {
  let service: GrupoDisciplinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoDisciplinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
