import { TestBed } from '@angular/core/testing';

import { AsignacionesServiceService } from './asignaciones-service.service';

describe('AsignacionesServiceService', () => {
  let service: AsignacionesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
