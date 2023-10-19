import { TestBed } from '@angular/core/testing';

import { MateriaServicioService } from './materia-servicio.service';

describe('MateriaServicioService', () => {
  let service: MateriaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
